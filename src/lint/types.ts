export type LintSeverity = 'error' | 'warning'

export type LintRuleCategory = 'spacing' | 'color' | 'font' | 'accessibility' | 'component'

export interface LintResult {
  rule: string
  severity: LintSeverity
  category: LintRuleCategory
  message: string
  file: string
  line?: number
  column?: number
  suggestion?: string
}

export interface LintRule {
  id: string
  name: string
  category: LintRuleCategory
  severity: LintSeverity
  description: string
  check: (context: LintContext) => LintResult[]
}

export interface LintContext {
  filePath: string
  content: string
  fileName: string
  tokenNames: Set<string>
  tokenValues: Map<string, string | number>
}

export interface LintReport {
  results: LintResult[]
  summary: {
    total: number
    errors: number
    warnings: number
    byCategory: Record<LintRuleCategory, number>
  }
}
