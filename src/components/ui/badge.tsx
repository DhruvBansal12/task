'use client'

import React from 'react'
import { cn } from '@utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    const variants = {
      default: 'bg-dark-700 text-dark-primary',
      primary: 'bg-primary/20 text-primary',
      success: 'bg-green-500/20 text-green-400',
      warning: 'bg-yellow-500/20 text-yellow-400',
      danger: 'bg-red-500/20 text-red-400',
      info: 'bg-cyan-500/20 text-cyan-400',
    }

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
