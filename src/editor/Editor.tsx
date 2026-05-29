import { EditorProvider } from './EditorProvider'
import { ComponentPanel } from './ComponentPanel'
import { PropertyPanel } from './PropertyPanel'
import { Canvas } from './Canvas'
import { StylePanel, LayoutTool, CodeExportPanel } from './StylePanel'

export function Editor() {
  return (
    <EditorProvider>
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'var(--font-sans)' }}>
        <ComponentPanel />
        <Canvas />
        <div style={{ width: 280, borderLeft: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
          <PropertyPanel />
          <StylePanel />
          <LayoutTool />
          <CodeExportPanel />
        </div>
      </div>
    </EditorProvider>
  )
}
