import { useEditor } from './EditorProvider'
import type { ComponentRegistryItem } from './types'

export function ComponentPanel() {
  const { registry, addComponent } = useEditor()

  const categories = Array.from(new Set(registry.map(r => r.category)))

  const handleDragStart = (e: React.DragEvent, item: ComponentRegistryItem) => {
    e.dataTransfer.setData('componentType', item.type)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleAdd = (item: ComponentRegistryItem) => {
    addComponent({
      id: `${item.type}-${Date.now()}`,
      type: item.type,
      props: { ...item.defaultProps }
    })
  }

  return (
    <div style={{ width: 240, borderRight: '1px solid var(--border-default)', padding: 16, overflowY: 'auto', height: '100%', background: 'var(--bg-primary)' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Components
      </h3>
      {categories.map(category => (
        <div key={category} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 4, fontWeight: 500 }}>
            {category}
          </div>
          {registry
            .filter(r => r.category === category)
            .map(item => (
              <div
                key={item.type}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onClick={() => handleAdd(item)}
                style={{
                  padding: '8px 12px',
                  margin: '2px 0',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'grab',
                  fontSize: 'var(--text-sm)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  userSelect: 'none',
                  transition: 'background 0.15s'
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)'
                }}
              >
                {item.name}
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
