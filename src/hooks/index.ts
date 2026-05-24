'use client'

import { useEffect, useState, useRef } from 'react'

/**
 * Hook to check if component is mounted
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

/**
 * Hook to handle async state
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = async () => {
    setStatus('pending')
    setData(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error as E)
      setStatus('error')
    }
  }

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate])

  return { execute, status, data, error }
}

/**
 * Hook to handle local storage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.log(error)
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}

/**
 * Hook to debounce values
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook to handle click outside
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])

  return ref
}

/**
 * Hook to handle escape key
 */
export function useEscapeKey(callback: () => void) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [callback])
}
