import type { LintRule, LintContext, LintResult } from '../types'

const FONT_SIZE_PATTERN = /font-size\s*:\s*([0-9]+(?:\.[0-9]+)?(?:px|rem|em))/g
const FONT_FAMILY_PATTERN = /font-family\s*:\s*([^;]+)/g

const ALLOWED_FONT_SIZES = new Set([
  '0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem',
  '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'
])

export const fontRule: LintRule = {
  id: 'font-token',
  name: 'Font Token Usage',
  category: 'font',
  severity: 'warning',
  description: 'Ensures font values use design tokens instead of hardcoded values',
  check(context: LintContext): LintResult[] {
    const results: LintResult[] = []
    const lines = context.content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let match

      const localSizePattern = new RegExp(FONT_SIZE_PATTERN.source, 'g')
      while ((match = localSizePattern.exec(line)) !== null) {
        const value = match[1]
        const usesVar = value.includes('var(')

        if (!usesVar && !ALLOWED_FONT_SIZES.has(value)) {
          results.push({
            rule: this.id,
            severity: this.severity,
            category: this.category,
            message: `Non-standard font-size "${value}" found. Use design token instead.`,
            file: context.filePath,
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
            rule: this.id,
            severity: this.severity,
            category: this.category,
            message: `Hardcoded font-family "${value}" found. Use design token instead.`,
            file: context.filePath,
            line: i + 1,
            column: match.index + 1,
            suggestion: 'Use CSS variable like var(--font-sans) instead of hardcoded font families'
          })
        }
      }
    }

    return results
  }
}
