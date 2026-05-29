import { useState } from 'react'
import { useEditor } from './EditorProvider'
import type { ExportFormat } from './types'

export function StylePanel() {
  const { state, updateComponent } = useEditor()
  const selectedId = state.selectedId
  const selectedComponent = selectedId
    ? state.components.find(c => c.id === selectedId)
    : null

  if (!selectedComponent) {
    return null
  }

  const styleOverrides = selectedComponent.styleOverrides || {}

  const updateStyle = (key: string, value: string) => {
    updateComponent(selectedId!, {
      styleOverrides: { ...styleOverrides, [key]: value }
    })
  }

  return (
    <div style={{ padding: 16, borderTop: '1px solid var(--border-default)' }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
        Style Overrides
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            Background
          </label>
          <input
            type="text"
            value={styleOverrides.background || ''}
            onChange={(e) => updateStyle('background', e.target.value)}
            placeholder="var(--bg-primary)"
            style={{
              width: '100%',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              fontSize: 'var(--text-sm)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            Padding
          </label>
          <input
            type="text"
            value={styleOverrides.padding || ''}
            onChange={(e) => updateStyle('padding', e.target.value)}
            placeholder="var(--padding-md)"
            style={{
              width: '100%',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              fontSize: 'var(--text-sm)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            Margin
          </label>
          <input
            type="text"
            value={styleOverrides.margin || ''}
            onChange={(e) => updateStyle('margin', e.target.value)}
            placeholder="0"
            style={{
              width: '100%',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              fontSize: 'var(--text-sm)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            Border Radius
          </label>
          <input
            type="text"
            value={styleOverrides.borderRadius || ''}
            onChange={(e) => updateStyle('borderRadius', e.target.value)}
            placeholder="var(--radius-md)"
            style={{
              width: '100%',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              fontSize: 'var(--text-sm)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function LayoutTool() {
  const { state, updateComponent } = useEditor()
  const selectedId = state.selectedId
  const selectedComponent = selectedId
    ? state.components.find(c => c.id === selectedId)
    : null

  if (!selectedComponent) return null

  return (
    <div style={{ padding: 16, borderTop: '1px solid var(--border-default)' }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
        Layout
      </h4>
      <div style={{ display: 'flex', gap: 4 }}>
        {(['flex-row', 'flex-col', 'grid'] as const).map(layout => (
          <button
            key={layout}
            onClick={() => updateComponent(selectedId!, { layout })}
            style={{
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              border: selectedComponent.layout === layout ? '2px solid var(--brand-primary)' : '1px solid var(--border-default)',
              background: selectedComponent.layout === layout ? 'var(--brand-primary-light)' : 'var(--bg-secondary)',
              cursor: 'pointer',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-primary)'
            }}
          >
            {layout === 'flex-row' ? '↔ Flex Row' : layout === 'flex-col' ? '↕ Flex Col' : '▦ Grid'}
          </button>
        ))}
      </div>
    </div>
  )
}

export function CodeExportPanel() {
  const { exportCode } = useEditor()
  const [format, setFormat] = useState<ExportFormat>('react')
  const [copied, setCopied] = useState(false)

  const code = exportCode(format)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: 16, borderTop: '1px solid var(--border-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h4 style={{ margin: 0, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
          Export Code
        </h4>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['react', 'vue', 'html'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              style={{
                padding: '2px 6px',
                borderRadius: 'var(--radius-md)',
                border: format === f ? '2px solid var(--brand-primary)' : '1px solid var(--border-default)',
                background: format === f ? 'var(--brand-primary-light)' : 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-primary)',
                textTransform: 'uppercase'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            padding: '2px 8px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-primary)',
            cursor: 'pointer',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-primary)',
            zIndex: 1
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre
          style={{
            margin: 0,
            padding: 12,
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-xs)',
            lineHeight: 1.5,
            overflow: 'auto',
            maxHeight: 200,
            color: 'var(--text-primary)'
          }}
        >
          {code}
        </pre>
      </div>
    </div>
  )
}
