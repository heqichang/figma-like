import type { SVGAttributes } from 'react'

export type IconSize = 16 | 20 | 24 | 32

export interface IconDefinition {
  name: string
  category: string
  description?: string
  svg: SVGAttributes<SVGElement> & { children?: React.ReactNode }
}

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: string
  size?: IconSize
  color?: string
  className?: string
}
