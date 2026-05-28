import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tokensDir = path.join(__dirname, '..', 'tokens')
const outputDir = path.join(__dirname, '..', 'dist', 'tokens')

const tokenLevels = ['global', 'alias', 'component']
const tokenTypeMap = {
  color: 'Colors',
  font: 'Typography',
  spacing: 'Spacing',
  radius: 'Border Radius',
  shadow: 'Shadows',
  duration: 'Animation',
  breakpoint: 'Breakpoints'
}

async function loadTokens() {
  const tokens = {}
  for (const level of tokenLevels) {
    const filePath = path.join(tokensDir, `${level}.ts`)
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8')
      const tokenMatch = content.match(/const \w+: Token\[\] = \[([\s\S]*?)\]/g)
      if (tokenMatch) {
        tokens[level] = []
        for (const block of tokenMatch) {
          const arrayMatch = block.match(/\[([\s\S]*?)\]$/)
          if (arrayMatch) {
            const tokenStr = arrayMatch[1]
            const tokenRegex = /\{([^}]+)\}/g
            let match
            while ((match = tokenRegex.exec(tokenStr)) !== null) {
              const tokenObj = parseTokenObj(match[1])
              if (tokenObj) {
                tokens[level].push(tokenObj)
              }
            }
          }
        }
      }
    }
  }
  return tokens
}

function parseTokenObj(content) {
  try {
    const obj = {}
    const pairs = content.split(',').map(p => p.trim()).filter(Boolean)
    for (const pair of pairs) {
      const colonIndex = pair.indexOf(':')
      if (colonIndex > 0) {
        const key = pair.slice(0, colonIndex).trim().replace(/^name: ?/, 'name').replace(/^['"]|['"]$/g, '')
        let value = pair.slice(colonIndex + 1).trim()
        if (value.startsWith("'") || value.startsWith('"')) {
          value = value.slice(1, -1)
        } else if (value === 'true') {
          value = true
        } else if (value === 'false') {
          value = false
        }
        obj[key] = value
      }
    }
    return obj.name ? obj : null
  } catch {
    return null
  }
}

function resolveValue(value, tokens, visited = new Set()) {
  if (typeof value !== 'string') return value
  const match = value.match(/^\{([^}]+)\}$/)
  if (match) {
    const refName = match[1]
    if (visited.has(refName)) return value
    visited.add(refName)
    for (const level of tokenLevels) {
      const found = tokens[level]?.find(t => t.name === refName)
      if (found) {
        return resolveValue(found.value, tokens, visited)
      }
    }
  }
  return value
}

async function exportCSS(tokens) {
  let css = ':root {\n'
  for (const level of tokenLevels) {
    if (tokens[level]) {
      css += `\n  /* ${level.charAt(0).toUpperCase() + level.slice(1)} Tokens */\n`
      for (const token of tokens[level]) {
        const value = resolveValue(token.value, tokens)
        css += `  --${token.name}: ${value};\n`
      }
    }
  }
  css += '}\n'
  await fs.writeFile(path.join(outputDir, 'tokens.css'), css)
  console.log('✓ Exported tokens.css')
}

async function exportSCSS(tokens) {
  let scss = ''
  for (const level of tokenLevels) {
    if (tokens[level]) {
      scss += `// ${level.charAt(0).toUpperCase() + level.slice(1)} Tokens\n`
      for (const token of tokens[level]) {
        const value = resolveValue(token.value, tokens)
        scss += `$${token.name}: ${value};\n`
      }
      scss += '\n'
    }
  }
  await fs.writeFile(path.join(outputDir, 'tokens.scss'), scss)
  console.log('✓ Exported tokens.scss')
}

async function exportJSON(tokens) {
  const jsonOutput = {}
  for (const level of tokenLevels) {
    if (tokens[level]) {
      jsonOutput[level] = {}
      for (const token of tokens[level]) {
        jsonOutput[level][token.name] = {
          value: resolveValue(token.value, tokens),
          type: token.type,
          description: token.description || ''
        }
      }
    }
  }
  await fs.writeJson(path.join(outputDir, 'tokens.json'), jsonOutput, { spaces: 2 })
  console.log('✓ Exported tokens.json')
}

async function exportTailwind(tokens) {
  const tailwind = {
    theme: {
      colors: {},
      spacing: {},
      borderRadius: {},
      boxShadow: {},
      transitionDuration: {},
      screens: {},
      fontFamily: {},
      fontSize: {},
      fontWeight: {}
    }
  }
  
  for (const level of tokenLevels) {
    if (tokens[level]) {
      for (const token of tokens[level]) {
        const value = resolveValue(token.value, tokens)
        switch (token.type) {
          case 'color':
            tailwind.theme.colors[token.name] = value
            break
          case 'spacing':
            tailwind.theme.spacing[token.name.replace('spacing-', '')] = value
            break
          case 'radius':
            tailwind.theme.borderRadius[token.name.replace('radius-', '')] = value
            break
          case 'shadow':
            tailwind.theme.boxShadow[token.name.replace('shadow-', '')] = value
            break
          case 'duration':
            tailwind.theme.transitionDuration[token.name.replace('duration-', '')] = value
            break
          case 'breakpoint':
            tailwind.theme.screens[token.name.replace('breakpoint-', '')] = value
            break
          case 'font':
            if (token.group === 'family') {
              tailwind.theme.fontFamily[token.name.replace('font-', '')] = value.split(',').map(f => f.trim().replace(/^['"]|['"]$/g, ''))
            } else if (token.group === 'size') {
              tailwind.theme.fontSize[token.name.replace('text-', '')] = value
            } else if (token.group === 'weight') {
              tailwind.theme.fontWeight[token.name.replace('font-', '')] = Number(value)
            }
            break
        }
      }
    }
  }
  
  await fs.writeJson(path.join(outputDir, 'tailwind.config.json'), tailwind, { spaces: 2 })
  console.log('✓ Exported tailwind.config.json')
}

async function main() {
  await fs.ensureDir(outputDir)
  const tokens = await loadTokens()
  
  await Promise.all([
    exportCSS(tokens),
    exportSCSS(tokens),
    exportJSON(tokens),
    exportTailwind(tokens)
  ])
  
  console.log('\n✅ All token files exported successfully!')
}

main().catch(console.error)