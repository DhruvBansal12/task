'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, CardDescription, CardTitle, Input } from '@components/ui'
import { useAuthStore } from '@store/index'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore(state => state.login)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gradient">GoodDay</h1>
          <CardDescription>Sign in to your account</CardDescription>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 border border-red-500/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={<Mail size={18} />}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            icon={<Lock size={18} />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-dark-secondary">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:text-accent">
              Create one
            </Link>
          </p>
        </div>

        {/* Demo users hint */}
        <div className="mt-6 pt-6 border-t border-dark-700">
          <p className="mb-3 text-xs text-dark-tertiary">Demo accounts (any password):</p>
          <div className="space-y-1 text-xs text-dark-secondary">
            <p>• john@example.com</p>
            <p>• jane@example.com</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
