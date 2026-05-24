'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-10 w-full rounded-2xl border border-dark-700 bg-dark-secondary p-6 shadow-xl',
          sizes[size],
          'animate-scale-in',
          className
        )}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-dark-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-dark-secondary transition-colors hover:text-dark-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export { Modal }
