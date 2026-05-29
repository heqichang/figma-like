export type LayoutType = 'flex-row' | 'flex-col' | 'grid'

export type ExportFormat = 'react' | 'vue' | 'html'

export interface EditorComponent {
  id: string
  type: string
  props: Record<string, unknown>
  children?: EditorComponent[]
  styleOverrides?: Record<string, string>
  layout?: LayoutType
}

export interface ComponentRegistryItem {
  type: string
  name: string
  category: string
  defaultProps: Record<string, unknown>
  propTypes: Record<string, PropDefinition>
}

export interface PropDefinition {
  type: 'string' | 'number' | 'boolean' | 'select' | 'node'
  options?: string[]
  defaultValue?: unknown
  description?: string
}

export interface EditorState {
  components: EditorComponent[]
  selectedId: string | null
  clipboard: EditorComponent | null
  history: EditorComponent[][]
  historyIndex: number
}

export interface EditorContextValue {
  state: EditorState
  addComponent: (component: EditorComponent, parentId?: string) => void
  removeComponent: (id: string) => void
  updateComponent: (id: string, updates: Partial<EditorComponent>) => void
  moveComponent: (id: string, direction: 'up' | 'down') => void
  selectComponent: (id: string | null) => void
  duplicateComponent: (id: string) => void
  undo: () => void
  redo: () => void
  exportCode: (format: ExportFormat) => string
  registry: ComponentRegistryItem[]
}
