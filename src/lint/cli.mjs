import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..', '..')

const extensions = ['.tsx', '.ts', '.css']

const SPACING_PATTERN = /(?:padding|margin|gap)\s*:\s*([0-9]+(?:\.[0-9]+)?(?:px|rem|em))/g
const SPACING_TOKEN_VALUES = new Set([
  '0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem',
  '2rem', '2.5rem', '3rem', '4rem'
])
const SPACING_TOKEN_PX = new Set([
  '0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px'
])

const COLOR_PATTERN = /(?:color|background-color|background|border-color|border)\s*:\s*(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\))/g
const ALLOWED_COLORS = new Set([
  '#FFFFFF', '#FFF', '#000000', '#000',
  '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280',
  '#4B5563', '#374151', '#1F2937', '#111827',
  '#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6',
  '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A',
  '#22C55E', '#EAB308', '#EF4444',
  '#8B5CF6', '#7C3AED', '#6D28D9', '#EDE9FE'
])

const FONT_SIZE_PATTERN = /font-size\s*:\s*([0-9]+(?:\.[0-9]+)?(?:px|rem|em))/g
const FONT_FAMILY_PATTERN = /font-family\s*:\s*([^;]+)/g
const ALLOWED_FONT_SIZES = new Set([
  '0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem',
  '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'
])

function getAllFiles(dir, exts, files = []) {
  if (!fs.existsSync(dir)) return files
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== 'generated') {
        getAllFiles(fullPath, exts, files)
      }
    } else if (exts.some(ext => entry.name.endsWith(ext)) && !entry.name.endsWith('.test.') && !entry.name.endsWith('.stories.')) {
      files.push(fullPath)
    }
  }
  return files
}

function checkSpacing(filePath, content) {
  const results = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const localPattern = new RegExp(SPACING_PATTERN.source, 'g')
    let match
    while ((match = localPattern.exec(line)) !== null) {
      const value = match[1]
      const usesVar = value.includes('var(')
      if (!usesVar && !SPACING_TOKEN_VALUES.has(value) && !SPACING_TOKEN_PX.has(value)) {
        results.push({
          rule: 'spacing-token',
          severity: 'warning',
          category: 'spacing',
          message: `Non-standard spacing value "${value}" found. Use design token instead.`,
          file: filePath,
          line: i + 1,
          column: match.index + 1,
          suggestion: 'Use CSS variable like var(--spacing-4) instead of hardcoded values'
        })
      }
    }
  }
  return results
}

function checkColor(filePath, content) {
  const results = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const localPattern = new RegExp(COLOR_PATTERN.source, 'g')
    let match
    while ((match = localPattern.exec(line)) !== null) {
      const value = match[1].toUpperCase()
      const usesVar = line.substring(match.index).includes('var(')
      if (!usesVar && !ALLOWED_COLORS.has(value)) {
        results.push({
          rule: 'color-token',
          severity: 'warning',
          category: 'color',
          message: `Non-standard color value "${match[1]}" found. Use design token instead.`,
          file: filePath,
          line: i + 1,
          column: match.index + 1,
          suggestion: 'Use CSS variable like var(--brand-primary) instead of hardcoded colors'
        })
      }
    }
  }
  return results
}

function checkFont(filePath, content) {
  const results = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const localSizePattern = new RegExp(FONT_SIZE_PATTERN.source, 'g')
    let match
    while ((match = localSizePattern.exec(line)) !== null) {
      const value = match[1]
      const usesVar = value.includes('var(')
      if (!usesVar && !ALLOWED_FONT_SIZES.has(value)) {
        results.push({
          rule: 'font-token',
          severity: 'warning',
          category: 'font',
          message: `Non-standard font-size "${value}" found. Use design token instead.`,
          file: filePath,
          line: i + 1,
          column: match.index + 1,
          suggestion: 'Use CSS variable like var(--text-base) instead of hardcoded font sizes'
        })
      }
    }
    const localFamilyPattern = new RegExp(FONT_FAMILY_PATTERN.source, 'g')
    while ((match = localFamilyPattern.exec(line)) !== null) {
      const value = match[1].trim()
      const usesVar = value.includes('var(')
      const isSystemFont = value.includes('system-ui') || value.includes('inherit')
      if (!usesVar && !isSystemFont) {
        results.push({
          rule: 'font-token',
          severity: 'warning',
          category: 'font',
          message: `Hardcoded font-family "${value}" found. Use design token instead.`,
          file: filePath,
          line: i + 1,
          column: match.index + 1,
          suggestion: 'Use CSS variable like var(--font-sans) instead of hardcoded font families'
        })
      }
    }
  }
  return results
}

function checkAccessibility(filePath, content, fileName) {
  const results = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('<img') && !line.includes('alt=') && !lines[i + 1]?.includes('alt=')) {
      results.push({
        rule: 'accessibility',
        severity: 'error',
        category: 'accessibility',
        message: 'Image element missing alt attribute',
        file: filePath,
        line: i + 1,
        suggestion: 'Add alt attribute to all img elements for screen readers'
      })
    }
    if (line.includes('onClick') && !line.includes('onKeyDown') && !line.includes('role=') && !fileName.includes('.test.')) {
      results.push({
        rule: 'accessibility',
        severity: 'warning',
        category: 'accessibility',
        message: 'onClick handler without corresponding keyboard handler',
        file: filePath,
        line: i + 1,
        suggestion: 'Add onKeyDown handler for keyboard accessibility'
      })
    }
  }
  return results
}

function checkComponentUsage(filePath, content, fileName) {
  const results = []
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('<button') && !line.includes('import') && fileName.endsWith('.tsx')) {
      const hasButtonImport = content.includes("import { Button") || content.includes("import { Button")
      if (!hasButtonImport) {
        results.push({
          rule: 'component-usage',
          severity: 'warning',
          category: 'component',
          message: 'Native <button> element found. Use the Button component instead.',
          file: filePath,
          line: i + 1,
          suggestion: "Import Button from '@mylib/components' instead of using native <button>"
        })
      }
    }
    if (line.includes('<input') && !line.includes('import') && fileName.endsWith('.tsx')) {
      const hasInputImport = content.includes("import { Input") || content.includes("import { Input")
      if (!hasInputImport) {
        results.push({
          rule: 'component-usage',
          severity: 'warning',
          category: 'component',
          message: 'Native <input> element found. Use the Input component instead.',
          file: filePath,
          line: i + 1,
          suggestion: "Import Input from '@mylib/components' instead of using native <input>"
        })
      }
    }
    if (line.includes('style={{')) {
      results.push({
        rule: 'component-usage',
        severity: 'warning',
        category: 'component',
        message: 'Inline style detected. Use CSS modules or design tokens instead.',
        file: filePath,
        line: i + 1,
        suggestion: 'Move inline styles to CSS modules and use design token CSS variables'
      })
    }
  }
  return results
}

function formatReport(results) {
  let output = '\n=== Design Lint Report ===\n\n'

  if (results.length === 0) {
    output += '✅ No design lint issues found!\n'
    return output
  }

  for (const result of results) {
    const icon = result.severity === 'error' ? '❌' : '⚠️'
    output += `${icon} [${result.severity.toUpperCase()}] ${result.rule}\n`
    output += `   ${result.message}\n`
    output += `   File: ${result.file}`
    if (result.line) output += `:${result.line}`
    if (result.column) output += `:${result.column}`
    output += '\n'
    if (result.suggestion) {
      output += `   Suggestion: ${result.suggestion}\n`
    }
    output += '\n'
  }

  const errors = results.filter(r => r.severity === 'error').length
  const warnings = results.filter(r => r.severity === 'warning').length
  const byCategory = {}
  for (const r of results) {
    byCategory[r.category] = (byCategory[r.category] || 0) + 1
  }

  output += '---\n'
  output += `Total: ${results.length} issues\n`
  output += `  Errors: ${errors}\n`
  output += `  Warnings: ${warnings}\n`
  output += '\nBy Category:\n'
  for (const [category, count] of Object.entries(byCategory)) {
    output += `  ${category}: ${count}\n`
  }

  return output
}

function runDesignLint() {
  const srcDir = path.join(projectRoot, 'src')
  const files = getAllFiles(srcDir, extensions)

  const allResults = []

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const relativePath = path.relative(projectRoot, filePath)
    const fileName = path.basename(filePath)

    allResults.push(...checkSpacing(relativePath, content))
    allResults.push(...checkColor(relativePath, content))
    allResults.push(...checkFont(relativePath, content))
    allResults.push(...checkAccessibility(relativePath, content, fileName))
    allResults.push(...checkComponentUsage(relativePath, content, fileName))
  }

  console.log(formatReport(allResults))

  const errors = allResults.filter(r => r.severity === 'error').length
  if (errors > 0) {
    process.exit(1)
  }
}

runDesignLint()
