'use client'

import React from 'react'
import { cn } from '@utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => (
    <div className="relative flex items-center">
      {icon && <div className="absolute left-3 text-dark-secondary">{icon}</div>}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-dark-700 bg-dark-secondary px-4 py-2 text-dark-primary placeholder-dark-tertiary outline-none transition-all duration-200',
          'focus:border-primary focus:shadow-lg',
          icon && 'pl-10',
          className
        )}
        {...props}
      />
    </div>
  )
)

Input.displayName = 'Input'

export { Input }
