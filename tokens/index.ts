export * from './types'
export * from './global'
export * from './alias'
export * from './component'

import { globalTokenGroups } from './global'
import { aliasTokenGroups } from './alias'
import { componentTokenGroups } from './component'
import type { TokenCollection } from './types'

export const tokenCollection: TokenCollection = {
  global: globalTokenGroups,
  alias: aliasTokenGroups,
  component: componentTokenGroups
}

export * from './utils'