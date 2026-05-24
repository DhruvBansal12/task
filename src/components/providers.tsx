'use client'

import { useEffect } from 'react'
import { initializeDemoData } from '@services/init.service'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData().catch(err => console.error('Failed to initialize demo data:', err))
  }, [])

  return <>{children}</>
}
