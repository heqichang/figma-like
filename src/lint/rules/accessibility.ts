import type { LintRule, LintContext, LintResult } from '../types'

export const accessibilityRule: LintRule = {
  id: 'accessibility',
  name: 'Accessibility Check',
  category: 'accessibility',
  severity: 'error',
  description: 'Checks for common accessibility issues in component code',
  check(context: LintContext): LintResult[] {
    const results: LintResult[] = []
    const lines = context.content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('<img') && !line.includes('alt=') && !lines[i + 1]?.includes('alt=')) {
        results.push({
          rule: this.id,
          severity: 'error',
          category: this.category,
          message: 'Image element missing alt attribute',
          file: context.filePath,
          line: i + 1,
          suggestion: 'Add alt attribute to all img elements for screen readers'
        })
      }

      if (line.includes('<button') && !line.includes('aria-label') && !line.includes('>')) {
        const nextLines = lines.slice(i, i + 5).join('\n')
        if (!nextLines.includes('>') || (nextLines.includes('>') && nextLines.split('>')[0].trim().endsWith('/'))) {
          if (!nextLines.includes('aria-label')) {
            results.push({
              rule: this.id,
              severity: 'warning',
              category: this.category,
              message: 'Button without visible text may need aria-label',
              file: context.filePath,
              line: i + 1,
              suggestion: 'Add aria-label to icon-only buttons'
            })
          }
        }
      }

      if (line.includes('onClick') && !line.includes('onKeyDown') && !line.includes('role=') && !context.fileName.includes('.test.')) {
        results.push({
          rule: this.id,
          severity: 'warning',
          category: this.category,
          message: 'onClick handler without corresponding keyboard handler',
          file: context.filePath,
          line: i + 1,
          suggestion: 'Add onKeyDown handler for keyboard accessibility'
        })
      }

      if (line.includes('color:') && line.includes('#') && context.fileName.endsWith('.css')) {
        const hexMatch = line.match(/#([0-9a-fA-F]{3,8})/g)
        if (hexMatch) {
          for (const hex of hexMatch) {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

            if (luminance > 0.4 && luminance < 0.6) {
              results.push({
                rule: this.id,
                severity: 'warning',
                category: this.category,
                message: `Color ${hex} may have insufficient contrast ratio`,
                file: context.filePath,
                line: i + 1,
                suggestion: 'Ensure text/background contrast ratio meets WCAG 2.1 AA (4.5:1 for normal text)'
              })
            }
          }
        }
      }
    }

    return results
  }
}
