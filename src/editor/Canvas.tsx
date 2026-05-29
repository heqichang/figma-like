import { useEditor } from './EditorProvider'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Card } from '../components/Card'
import { Icon } from '../icons/Icon'
import type { EditorComponent } from './types'

function RenderComponent({ component }: { component: EditorComponent }) {
  const { selectComponent, state } = useEditor()
  const isSelected = state.selectedId === component.id

  const styleOverrides = component.styleOverrides || {}
  const layoutStyle: React.CSSProperties = {}
  if (component.layout === 'flex-row') {
    layoutStyle.display = 'flex'
    layoutStyle.flexDirection = 'row'
    layoutStyle.gap = 'var(--gap-md)'
  } else if (component.layout === 'flex-col') {
    layoutStyle.display = 'flex'
    layoutStyle.flexDirection = 'column'
    layoutStyle.gap = 'var(--gap-md)'
  } else if (component.layout === 'grid') {
    layoutStyle.display = 'grid'
    layoutStyle.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))'
    layoutStyle.gap = 'var(--gap-md)'
  }

  const wrapperStyle: React.CSSProperties = {
    ...styleOverrides,
    ...layoutStyle,
    outline: isSelected ? '2px solid var(--brand-primary)' : '2px solid transparent',
    outlineOffset: 2,
    cursor: 'pointer',
    position: 'relative'
  }

  const renderByType = () => {
    switch (component.type) {
      case 'Button':
        return <Button {...(component.props as any)} />
      case 'Input':
        return <Input {...(component.props as any)} />
      case 'Card':
        return <Card {...(component.props as any)} />
      case 'Icon':
        return <Icon {...(component.props as any)} />
      default:
        return <div>Unknown: {component.type}</div>
    }
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        selectComponent(component.id)
      }}
      style={wrapperStyle}
    >
      {renderByType()}
      {component.children?.map(child => (
        <RenderComponent key={child.id} component={child} />
      ))}
    </div>
  )
}

export function Canvas() {
  const { state, selectComponent, addComponent } = useEditor()

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData('componentType')
    if (componentType) {
      addComponent({
        id: `${componentType}-${Date.now()}`,
        type: componentType,
        props: {}
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => selectComponent(null)}
      style={{
        flex: 1,
        padding: 24,
        background: 'var(--bg-secondary)',
        minHeight: '100%',
        overflowY: 'auto'
      }}
    >
      {state.components.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--text-tertiary)',
          fontSize: 'var(--text-sm)',
          border: '2px dashed var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: 48
        }}>
          <p style={{ margin: 0 }}>Drag components here or click to add</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {state.components.map(component => (
            <RenderComponent key={component.id} component={component} />
          ))}
        </div>
      )}
    </div>
  )
}
