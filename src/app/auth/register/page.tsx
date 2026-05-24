'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, CardDescription, Input } from '@components/ui'
import { useAuthStore } from '@store/index'
import Link from 'next/link'
import { Mail, Lock, User } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const register = useAuthStore(state => state.register)
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const success = register(email, name, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError('Email already exists')
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gradient">GoodDay</h1>
          <CardDescription>Create your account</CardDescription>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 border border-red-500/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={<User size={18} />}
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <Input
            icon={<Lock size={18} />}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-dark-secondary">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary hover:text-accent">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
