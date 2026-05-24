'use client'

import React from 'react'
import { cn } from '@utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-primary to-accent text-white hover:shadow-glow disabled:opacity-50',
      secondary: 'bg-dark-secondary text-dark-primary hover:bg-dark-tertiary',
      outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-dark-secondary hover:text-dark-primary hover:bg-dark-tertiary',
      danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        className={cn(
          'rounded-xl font-medium transition-all duration-200 inline-flex items-center justify-center gap-2',
          variants[variant],
          sizes[size],
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
