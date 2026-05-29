import type { LintRule, LintContext, LintResult } from '../types'

const SPACING_PATTERN = /(?:padding|margin|gap)\s*:\s*([0-9]+(?:\.[0-9]+)?(?:px|rem|em))/g
const SPACING_TOKEN_VALUES = new Set([
  '0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem',
  '2rem', '2.5rem', '3rem', '4rem'
])
const SPACING_TOKEN_PX = new Set([
  '0px', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '40px', '48px', '64px'
])

export const spacingRule: LintRule = {
  id: 'spacing-token',
  name: 'Spacing Token Usage',
  category: 'spacing',
  severity: 'warning',
  description: 'Ensures spacing values use design tokens instead of hardcoded values',
  check(context: LintContext): LintResult[] {
    const results: LintResult[] = []
    const lines = context.content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let match

      const localPattern = new RegExp(SPACING_PATTERN.source, 'g')
      while ((match = localPattern.exec(line)) !== null) {
        const value = match[1]
        const usesVar = value.includes('var(')

        if (!usesVar && !SPACING_TOKEN_VALUES.has(value) && !SPACING_TOKEN_PX.has(value)) {
          results.push({
            rule: this.id,
            severity: this.severity,
            category: this.category,
            message: `Non-standard spacing value "${value}" found. Use design token instead.`,
            file: context.filePath,
            line: i + 1,
            column: match.index + 1,
            suggestion: 'Use CSS variable like var(--spacing-4) instead of hardcoded values'
          })
        }
      }
    }

    return results
  }
}
