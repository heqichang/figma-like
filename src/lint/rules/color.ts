import type { LintRule, LintContext, LintResult } from '../types'

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

export const colorRule: LintRule = {
  id: 'color-token',
  name: 'Color Token Usage',
  category: 'color',
  severity: 'warning',
  description: 'Ensures color values use design tokens instead of hardcoded hex/rgb values',
  check(context: LintContext): LintResult[] {
    const results: LintResult[] = []
    const lines = context.content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let match

      const localPattern = new RegExp(COLOR_PATTERN.source, 'g')
      while ((match = localPattern.exec(line)) !== null) {
        const value = match[1].toUpperCase()
        const usesVar = line.substring(match.index).includes('var(')

        if (!usesVar && !ALLOWED_COLORS.has(value)) {
          results.push({
            rule: this.id,
            severity: this.severity,
            category: this.category,
            message: `Non-standard color value "${match[1]}" found. Use design token instead.`,
            file: context.filePath,
            line: i + 1,
            column: match.index + 1,
            suggestion: 'Use CSS variable like var(--brand-primary) instead of hardcoded colors'
          })
        }
      }
    }

    return results
  }
}
