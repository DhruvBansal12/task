import { Button } from '@components/ui'
import { ArrowRight, Zap, Users, BarChart3, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-dark-700 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-gradient">GoodDay</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold text-dark-primary mb-6 leading-tight">
          Everything you need to{' '}
          <span className="text-gradient">manage projects</span> and boost
          productivity
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-dark-secondary mb-12">
          A modern SaaS platform inspired by Linear, Notion, and Asana. Built for teams that
          want to work smarter, faster, and together.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button size="lg">
              Get Started Free <ArrowRight size={20} />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mx-auto mt-20 max-w-4xl rounded-2xl border border-dark-700 bg-dark-secondary/50 p-8 backdrop-blur">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-4 h-12 w-12 text-primary" />
              <p className="text-dark-secondary">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-16 text-center text-4xl font-bold text-dark-primary">
          Powerful Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Blazing fast UI with instant updates and smooth animations',
            },
            {
              icon: Users,
              title: 'Team Collaboration',
              description: 'Work together seamlessly with real-time updates and comments',
            },
            {
              icon: Calendar,
              title: 'Task Management',
              description: 'Create, organize, and track tasks with deadlines and priorities',
            },
            {
              icon: BarChart3,
              title: 'Analytics',
              description: 'Get insights into productivity and team performance',
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="rounded-2xl border border-dark-700 bg-dark-secondary/50 p-6 backdrop-blur hover:border-primary transition-all"
              >
                <Icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold text-dark-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-secondary">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-16 text-center text-4xl font-bold text-dark-primary">
          Simple Pricing
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: 'Starter',
              price: 'Free',
              features: ['Up to 3 projects', 'Basic task management', '5 team members'],
            },
            {
              name: 'Professional',
              price: '$29',
              period: '/month',
              features: ['Unlimited projects', 'Advanced analytics', 'Unlimited team members', 'Priority support'],
              highlighted: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA'],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-8 ${
                plan.highlighted
                  ? 'border-primary bg-primary/10'
                  : 'border-dark-700 bg-dark-secondary'
              }`}
            >
              <h3 className="mb-2 text-2xl font-bold text-dark-primary">{plan.name}</h3>
              <p className="mb-6 text-dark-secondary">
                <span className="text-3xl font-bold text-dark-primary">{plan.price}</span>
                {plan.period && <span className="text-dark-secondary">{plan.period}</span>}
              </p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-dark-secondary">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? 'primary' : 'outline'} className="w-full">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 bg-dark-secondary/50 px-6 py-12 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">GoodDay</div>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-dark-secondary hover:text-dark-primary">
                Privacy
              </a>
              <a href="#" className="text-dark-secondary hover:text-dark-primary">
                Terms
              </a>
              <a href="#" className="text-dark-secondary hover:text-dark-primary">
                Contact
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-dark-tertiary">
            © 2026 GoodDay. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
