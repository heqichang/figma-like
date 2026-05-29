import type { LintRule, LintContext, LintResult } from '../types'

const STANDARD_IMPORT_PATH = '@mylib/components'

export const componentRule: LintRule = {
  id: 'component-usage',
  name: 'Component Usage Check',
  category: 'component',
  severity: 'warning',
  description: 'Checks for usage of non-standard components or properties',
  check(context: LintContext): LintResult[] {
    const results: LintResult[] = []
    const lines = context.content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('<button') && !line.includes('import') && context.fileName.endsWith('.tsx')) {
        const hasButtonImport = context.content.includes('import { Button') || context.content.includes("import { Button")
        if (!hasButtonImport) {
          results.push({
            rule: this.id,
            severity: 'warning',
            category: this.category,
            message: 'Native <button> element found. Use the Button component instead.',
            file: context.filePath,
            line: i + 1,
            suggestion: `Import Button from '${STANDARD_IMPORT_PATH}' instead of using native <button>`
          })
        }
      }

      if (line.includes('<input') && !line.includes('import') && context.fileName.endsWith('.tsx')) {
        const hasInputImport = context.content.includes('import { Input') || context.content.includes("import { Input")
        if (!hasInputImport) {
          results.push({
            rule: this.id,
            severity: 'warning',
            category: this.category,
            message: 'Native <input> element found. Use the Input component instead.',
            file: context.filePath,
            line: i + 1,
            suggestion: `Import Input from '${STANDARD_IMPORT_PATH}' instead of using native <input>`
          })
        }
      }

      const deprecatedProps = ['style={{']
      for (const deprecated of deprecatedProps) {
        if (line.includes(deprecated)) {
          results.push({
            rule: this.id,
            severity: 'warning',
            category: this.category,
            message: 'Inline style detected. Use CSS modules or design tokens instead.',
            file: context.filePath,
            line: i + 1,
            suggestion: 'Move inline styles to CSS modules and use design token CSS variables'
          })
        }
      }
    }

    return results
  }
}
