'use client'

import React from 'react'
import { cn } from '@utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isClickable?: boolean
  isGlass?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, isClickable = false, isGlass = false, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-dark-700 p-6 transition-all duration-200',
        isGlass ? 'glass-dark' : 'bg-dark-secondary',
        isClickable && 'cursor-pointer hover:border-primary hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 flex items-center justify-between', className)}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-dark-primary', className)}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-dark-secondary', className)}
      {...props}
    />
  )
)

CardDescription.displayName = 'CardDescription'

export { Card, CardHeader, CardTitle, CardDescription }
