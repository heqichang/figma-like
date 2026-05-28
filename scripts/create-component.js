import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.join(__dirname, '..', 'src', 'components')

const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Please provide a component name: npm run component:create ComponentName')
  process.exit(1)
}

const pascalName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
const kebabName = pascalName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
const componentDir = path.join(componentsDir, pascalName)

const files = {
  [`${pascalName}.tsx`]: generateComponent(),
  [`${pascalName}.module.css`]: generateStyles(),
  [`${pascalName}.stories.tsx`]: generateStories(),
  [`${pascalName}.test.tsx`]: generateTests(),
  'types.ts': generateTypes(),
  'index.ts': generateIndex()
}

function generateComponent() {
  return `import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import styles from './${pascalName}.module.css'
import type { ${pascalName}Props } from './types'

export const ${pascalName} = forwardRef<HTMLDivElement, ${pascalName}Props>(
  ({ className, children, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.${kebabName}, styles[${'`'}${kebabName}--variant-\${variant}${'`'}], styles[${'`'}${kebabName}--size-\${size}${'`'}], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

${pascalName}.displayName = '${pascalName}'
`
}

function generateStyles() {
  return `.${kebabName} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.${kebabName}--variant-default {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.${kebabName}--variant-primary {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
}

.${kebabName}--size-sm {
  padding: var(--padding-sm);
  font-size: var(--text-sm);
}

.${kebabName}--size-md {
  padding: var(--padding-md);
  font-size: var(--text-base);
}

.${kebabName}--size-lg {
  padding: var(--padding-lg);
  font-size: var(--text-lg);
}
`
}

function generateStories() {
  return `import type { Meta, StoryObj } from '@storybook/react'
import { ${pascalName} } from './${pascalName}'
import type { ${pascalName}Props } from './types'

const meta = {
  title: 'Components/${pascalName}',
  component: ${pascalName},
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
} satisfies Meta<${pascalName}Props>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '${pascalName} Content',
    variant: 'default',
    size: 'md'
  }
}

export const Primary: Story = {
  args: {
    children: 'Primary ${pascalName}',
    variant: 'primary'
  }
}

export const Sizes: Story = {
  render: (args: ${pascalName}Props) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <${pascalName} {...args} size="sm">Small</${pascalName}>
      <${pascalName} {...args} size="md">Medium</${pascalName}>
      <${pascalName} {...args} size="lg">Large</${pascalName}>
    </div>
  )
}
`
}

function generateTests() {
  return `import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ${pascalName} } from './${pascalName}'

describe('${pascalName}', () => {
  it('renders children correctly', () => {
    render(<${pascalName}>Test ${pascalName}</${pascalName}>)
    expect(screen.getByText('Test ${pascalName}')).toBeInTheDocument()
  })

  it('applies variant class correctly', () => {
    const { container } = render(<${pascalName} variant="primary">Test</${pascalName}>)
    expect(container.firstChild).toHaveClass('${kebabName}--variant-primary')
  })

  it('applies size class correctly', () => {
    const { container } = render(<${pascalName} size="sm">Test</${pascalName}>)
    expect(container.firstChild).toHaveClass('${kebabName}--size-sm')
  })

  it('merges custom className', () => {
    const { container } = render(<${pascalName} className="custom-class">Test</${pascalName}>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
`
}

function generateTypes() {
  return `import type { HTMLAttributes } from 'react'

export interface ${pascalName}Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the ${pascalName}
   * @default 'default'
   */
  variant?: 'default' | 'primary'
  
  /**
   * The size of the ${pascalName}
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
}
`
}

function generateIndex() {
  return `export { ${pascalName} } from './${pascalName}'
export type { ${pascalName}Props } from './types'
`
}

async function main() {
  if (await fs.pathExists(componentDir)) {
    console.error(`❌ Component ${pascalName} already exists!`)
    process.exit(1)
  }
  
  await fs.ensureDir(componentDir)
  
  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(componentDir, filename)
    await fs.writeFile(filePath, content)
    console.log(`  Created ${filename}`)
  }
  
  console.log(`\n✅ Component ${pascalName} created successfully!`)
  console.log(`   Location: ${componentDir}`)
  console.log(`\n   Next steps:`)
  console.log(`   - Register component in src/index.ts`)
  console.log(`   - Run npm run storybook to preview`)
}

main().catch(console.error)