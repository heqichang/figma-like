import { useEditor } from './EditorProvider'
import type { PropDefinition } from './types'

function PropEditor({
  name,
  definition,
  value,
  onChange
}: {
  name: string
  definition: PropDefinition
  value: unknown
  onChange: (value: unknown) => void
}) {
  switch (definition.type) {
    case 'boolean':
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)' }}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {name}
        </label>
      )
    case 'select':
      return (
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            {name}
          </label>
          <select
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '100%',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              fontSize: 'var(--text-sm)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          >
            {definition.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )
    case 'number':
      return (
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            {name}
          </label>
          <input
            type="number"
            value={Number(value) || 0}
            onChange={(e) => onChange(Number(e.target.value))}
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
      )
    default:
      return (
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 2 }}>
            {name}
          </label>
          <input
            type="text"
            value={String(value || '')}
            onChange={(e) => onChange(e.target.value)}
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
      )
  }
}

export function PropertyPanel() {
  const { state, registry, updateComponent, removeComponent, moveComponent } = useEditor()

  const selectedId = state.selectedId
  if (!selectedId) {
    return (
      <div style={{ width: 280, borderLeft: '1px solid var(--border-default)', padding: 16, background: 'var(--bg-primary)', height: '100%', overflowY: 'auto' }}>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
          Select a component to edit its properties
        </p>
      </div>
    )
  }

  const selectedComponent = state.components.find(c => c.id === selectedId)
  if (!selectedComponent) {
    return null
  }

  const registryItem = registry.find(r => r.type === selectedComponent.type)
  if (!registryItem) return null

  return (
    <div style={{ width: 280, borderLeft: '1px solid var(--border-default)', padding: 16, background: 'var(--bg-primary)', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>
          {selectedComponent.type}
        </h3>
        <button
          onClick={() => removeComponent(selectedId)}
          style={{
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--state-error)',
            background: 'transparent',
            color: 'var(--state-error)',
            cursor: 'pointer',
            fontSize: 'var(--text-xs)'
          }}
        >
          Delete
        </button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        <button
          onClick={() => moveComponent(selectedId, 'up')}
          style={{
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-primary)'
          }}
        >
          ↑ Up
        </button>
        <button
          onClick={() => moveComponent(selectedId, 'down')}
          style={{
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-primary)'
          }}
        >
          ↓ Down
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(registryItem.propTypes).map(([name, definition]) => (
          <PropEditor
            key={name}
            name={name}
            definition={definition}
            value={selectedComponent.props[name]}
            onChange={(value) => {
              updateComponent(selectedId, {
                props: { ...selectedComponent.props, [name]: value }
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
