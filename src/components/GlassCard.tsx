import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  strong?: boolean
}

export function GlassCard({ children, className = '', strong }: Props) {
  return (
    <div className={`${strong ? 'glass-strong' : 'glass'} rounded-3xl ${className}`}>
      {children}
    </div>
  )
}
