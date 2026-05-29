import type { LintRule, LintContext, LintResult, LintReport, LintRuleCategory } from './types'
import { spacingRule } from './rules/spacing'
import { colorRule } from './rules/color'
import { fontRule } from './rules/font'
import { accessibilityRule } from './rules/accessibility'
import { componentRule } from './rules/component'

const builtInRules: LintRule[] = [
  spacingRule,
  colorRule,
  fontRule,
  accessibilityRule,
  componentRule
]

export class DesignLinter {
  private rules: LintRule[] = []
  private tokenNames: Set<string>
  private tokenValues: Map<string, string | number>

  constructor(
    tokenNames: Set<string> = new Set(),
    tokenValues: Map<string, string | number> = new Map(),
    customRules?: LintRule[]
  ) {
    this.tokenNames = tokenNames
    this.tokenValues = tokenValues
    this.rules = [...builtInRules, ...(customRules || [])]
  }

  addRule(rule: LintRule): void {
    this.rules.push(rule)
  }

  removeRule(ruleId: string): void {
    this.rules = this.rules.filter(r => r.id !== ruleId)
  }

  getRules(): LintRule[] {
    return [...this.rules]
  }

  lintFile(filePath: string, content: string): LintResult[] {
    const fileName = filePath.split(/[\\/]/).pop() || filePath
    const context: LintContext = {
      filePath,
      content,
      fileName,
      tokenNames: this.tokenNames,
      tokenValues: this.tokenValues
    }

    const results: LintResult[] = []
    for (const rule of this.rules) {
      results.push(...rule.check(context))
    }

    return results
  }

  lintFiles(files: { path: string; content: string }[]): LintReport {
    const allResults: LintResult[] = []

    for (const file of files) {
      allResults.push(...this.lintFile(file.path, file.content))
    }

    return this.createReport(allResults)
  }

  private createReport(results: LintResult[]): LintReport {
    const byCategory: Record<LintRuleCategory, number> = {
      spacing: 0,
      color: 0,
      font: 0,
      accessibility: 0,
      component: 0
    }

    for (const result of results) {
      byCategory[result.category]++
    }

    return {
      results,
      summary: {
        total: results.length,
        errors: results.filter(r => r.severity === 'error').length,
        warnings: results.filter(r => r.severity === 'warning').length,
        byCategory
      }
    }
  }

  static formatReport(report: LintReport): string {
    let output = '\n=== Design Lint Report ===\n\n'

    if (report.results.length === 0) {
      output += '✅ No design lint issues found!\n'
      return output
    }

    for (const result of report.results) {
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

    output += '---\n'
    output += `Total: ${report.summary.total} issues\n`
    output += `  Errors: ${report.summary.errors}\n`
    output += `  Warnings: ${report.summary.warnings}\n`
    output += '\nBy Category:\n'
    for (const [category, count] of Object.entries(report.summary.byCategory)) {
      if (count > 0) {
        output += `  ${category}: ${count}\n`
      }
    }

    return output
  }
}

export { builtInRules }
