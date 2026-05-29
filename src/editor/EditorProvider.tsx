import { createContext, useContext, useReducer, useCallback, useMemo, type ReactNode } from 'react'
import type { EditorComponent, EditorState, EditorContextValue, ExportFormat } from './types'
import { componentRegistry } from './registry'
import { exportCode } from './codeExport'

const initialState: EditorState = {
  components: [],
  selectedId: null,
  clipboard: null,
  history: [[]],
  historyIndex: 0
}

type EditorAction =
  | { type: 'ADD_COMPONENT'; payload: { component: EditorComponent; parentId?: string } }
  | { type: 'REMOVE_COMPONENT'; payload: { id: string } }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<EditorComponent> } }
  | { type: 'MOVE_COMPONENT'; payload: { id: string; direction: 'up' | 'down' } }
  | { type: 'SELECT_COMPONENT'; payload: { id: string | null } }
  | { type: 'DUPLICATE_COMPONENT'; payload: { id: string } }
  | { type: 'UNDO' }
  | { type: 'REDO' }

function removeFromTree(components: EditorComponent[], id: string): EditorComponent[] {
  return components
    .filter(c => c.id !== id)
    .map(c => ({
      ...c,
      children: c.children ? removeFromTree(c.children, id) : undefined
    }))
}

function updateInTree(
  components: EditorComponent[],
  id: string,
  updates: Partial<EditorComponent>
): EditorComponent[] {
  return components.map(c => {
    if (c.id === id) return { ...c, ...updates }
    if (c.children) {
      return { ...c, children: updateInTree(c.children, id, updates) }
    }
    return c
  })
}

function addToParent(
  components: EditorComponent[],
  component: EditorComponent,
  parentId?: string
): EditorComponent[] {
  if (!parentId) return [...components, component]
  return components.map(c => {
    if (c.id === parentId) {
      return { ...c, children: [...(c.children || []), component] }
    }
    if (c.children) {
      return { ...c, children: addToParent(c.children, component, parentId) }
    }
    return c
  })
}

function duplicateInTree(components: EditorComponent[], id: string): EditorComponent[] {
  const result: EditorComponent[] = []
  for (const c of components) {
    result.push({ ...c })
    if (c.id === id) {
      const clone = JSON.parse(JSON.stringify(c)) as EditorComponent
      clone.id = `${c.type}-${Date.now()}`
      result.push(clone)
    }
  }
  return result
}

function moveInTree(
  components: EditorComponent[],
  id: string,
  direction: 'up' | 'down'
): EditorComponent[] {
  const index = components.findIndex(c => c.id === id)
  if (index === -1) {
    return components.map(c => ({
      ...c,
      children: c.children ? moveInTree(c.children, id, direction) : undefined
    }))
  }

  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= components.length) return components

  const newComponents = [...components]
  ;[newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]]
  return newComponents
}

function pushHistory(state: EditorState, newComponents: EditorComponent[]): EditorState {
  const newHistory = state.history.slice(0, state.historyIndex + 1)
  newHistory.push(newComponents)
  return {
    ...state,
    components: newComponents,
    history: newHistory,
    historyIndex: newHistory.length - 1
  }
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'ADD_COMPONENT': {
      const { component, parentId } = action.payload
      const newComponents = addToParent(state.components, component, parentId)
      return { ...pushHistory(state, newComponents), selectedId: component.id }
    }
    case 'REMOVE_COMPONENT': {
      const newComponents = removeFromTree(state.components, action.payload.id)
      return {
        ...pushHistory(state, newComponents),
        selectedId: state.selectedId === action.payload.id ? null : state.selectedId
      }
    }
    case 'UPDATE_COMPONENT': {
      const { id, updates } = action.payload
      const newComponents = updateInTree(state.components, id, updates)
      return pushHistory(state, newComponents)
    }
    case 'MOVE_COMPONENT': {
      const { id, direction } = action.payload
      const newComponents = moveInTree(state.components, id, direction)
      return pushHistory(state, newComponents)
    }
    case 'SELECT_COMPONENT':
      return { ...state, selectedId: action.payload.id }
    case 'DUPLICATE_COMPONENT': {
      const newComponents = duplicateInTree(state.components, action.payload.id)
      return pushHistory(state, newComponents)
    }
    case 'UNDO': {
      if (state.historyIndex <= 0) return state
      const newIndex = state.historyIndex - 1
      return {
        ...state,
        components: state.history[newIndex],
        historyIndex: newIndex,
        selectedId: null
      }
    }
    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state
      const newIndex = state.historyIndex + 1
      return {
        ...state,
        components: state.history[newIndex],
        historyIndex: newIndex,
        selectedId: null
      }
    }
    default:
      return state
  }
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const addComponent = useCallback((component: EditorComponent, parentId?: string) => {
    dispatch({ type: 'ADD_COMPONENT', payload: { component, parentId } })
  }, [])

  const removeComponent = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: { id } })
  }, [])

  const updateComponent = useCallback((id: string, updates: Partial<EditorComponent>) => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: { id, updates } })
  }, [])

  const moveComponent = useCallback((id: string, direction: 'up' | 'down') => {
    dispatch({ type: 'MOVE_COMPONENT', payload: { id, direction } })
  }, [])

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: { id } })
  }, [])

  const duplicateComponent = useCallback((id: string) => {
    dispatch({ type: 'DUPLICATE_COMPONENT', payload: { id } })
  }, [])

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' })
  }, [])

  const exportCodeFn = useCallback((format: ExportFormat): string => {
    return exportCode(state.components, format)
  }, [state.components])

  const value = useMemo<EditorContextValue>(() => ({
    state,
    addComponent,
    removeComponent,
    updateComponent,
    moveComponent,
    selectComponent,
    duplicateComponent,
    undo,
    redo,
    exportCode: exportCodeFn,
    registry: componentRegistry
  }), [state, addComponent, removeComponent, updateComponent, moveComponent, selectComponent, duplicateComponent, undo, redo, exportCodeFn])

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor(): EditorContextValue {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}

export { EditorContext }
