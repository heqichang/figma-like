import type { IconDefinition } from './types'

const icons: IconDefinition[] = [
  {
    name: 'check',
    category: 'status',
    description: 'Checkmark icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'close',
    category: 'actions',
    description: 'Close/X icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'chevron-down',
    category: 'navigation',
    description: 'Chevron down icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'chevron-up',
    category: 'navigation',
    description: 'Chevron up icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'chevron-left',
    category: 'navigation',
    description: 'Chevron left icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'chevron-right',
    category: 'navigation',
    description: 'Chevron right icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'search',
    category: 'actions',
    description: 'Search icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'plus',
    category: 'actions',
    description: 'Plus icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'minus',
    category: 'actions',
    description: 'Minus icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'info',
    category: 'status',
    description: 'Info icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'warning',
    category: 'status',
    description: 'Warning icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'error',
    category: 'status',
    description: 'Error icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'eye',
    category: 'actions',
    description: 'Eye/visibility icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'eye-off',
    category: 'actions',
    description: 'Eye off/hidden icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'settings',
    category: 'actions',
    description: 'Settings/gear icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  },
  {
    name: 'copy',
    category: 'actions',
    description: 'Copy icon',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      children: undefined
    }
  }
]

const iconRegistry = new Map<string, IconDefinition>()
const categoryMap = new Map<string, IconDefinition[]>()

for (const icon of icons) {
  iconRegistry.set(icon.name, icon)
  if (!categoryMap.has(icon.category)) {
    categoryMap.set(icon.category, [])
  }
  categoryMap.get(icon.category)!.push(icon)
}

export function getIcon(name: string): IconDefinition | undefined {
  return iconRegistry.get(name)
}

export function getIconsByCategory(category: string): IconDefinition[] {
  return categoryMap.get(category) || []
}

export function getAllIcons(): IconDefinition[] {
  return icons
}

export function getCategories(): string[] {
  return Array.from(categoryMap.keys())
}

export function registerIcon(icon: IconDefinition): void {
  iconRegistry.set(icon.name, icon)
  if (!categoryMap.has(icon.category)) {
    categoryMap.set(icon.category, [])
  }
  categoryMap.get(icon.category)!.push(icon)
}

export function searchIcons(query: string): IconDefinition[] {
  const lowerQuery = query.toLowerCase()
  return icons.filter(
    icon =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.category.toLowerCase().includes(lowerQuery) ||
      icon.description?.toLowerCase().includes(lowerQuery)
  )
}
