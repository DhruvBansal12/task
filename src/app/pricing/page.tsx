'use client'

import { Card } from '@components/ui'
import { Button } from '@components/ui'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 3 projects',
        'Basic task management',
        '5 team members',
        'Calendar view',
        'Basic analytics',
        'Email support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For growing teams and businesses',
      features: [
        'Unlimited projects',
        'Advanced task management',
        'Unlimited team members',
        'Kanban board',
        'Advanced analytics',
        'Calendar & scheduling',
        'Priority support',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee',
        'Advanced security',
        'Custom training',
        'On-premise option',
        '24/7 phone support',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-dark-700 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-gradient">
            GoodDay
          </Link>
          <Link href="/">
            <Button variant="ghost">Back</Button>
          </Link>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold text-dark-primary mb-6">
          Simple, Transparent <span className="text-gradient">Pricing</span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-dark-secondary mb-4">
          Choose the perfect plan for your team. Scale as you grow.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="text-dark-primary">Billed Monthly</span>
          <button className="relative inline-flex h-8 w-14 rounded-full bg-dark-700">
            <span className="inline-flex h-8 w-8 transform rounded-full bg-white transition" />
          </button>
          <span className="text-dark-secondary">Billed Annually (Save 20%)</span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Card
              key={i}
              className={`flex flex-col transition-all ${
                plan.highlighted
                  ? 'border-primary bg-primary/10 ring-2 ring-primary scale-105'
                  : 'hover:border-primary'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold w-fit">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-dark-primary mb-2">{plan.name}</h3>
              <p className="text-dark-secondary text-sm mb-6">{plan.description}</p>

              {/* Pricing */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-dark-primary">{plan.price}</span>
                {plan.period && <span className="text-dark-secondary ml-2">{plan.period}</span>}
                {plan.price === 'Custom' && <p className="text-sm text-dark-secondary mt-2">Contact for quote</p>}
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-dark-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold text-dark-primary mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              q: 'Can I change plans anytime?',
              a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes! All paid plans come with a 14-day free trial. No credit card required.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.',
            },
            {
              q: 'Can I export my data?',
              a: 'Yes, you can export all your data at any time in CSV or JSON format.',
            },
            {
              q: 'Do you offer discounts for annual billing?',
              a: 'Yes! Save 20% when you choose annual billing instead of monthly.',
            },
            {
              q: 'What is your refund policy?',
              a: 'We offer a 30-day money-back guarantee if you\'re not satisfied.',
            },
          ].map((item, i) => (
            <Card key={i} className="p-6">
              <h3 className="text-lg font-semibold text-dark-primary mb-2">{item.q}</h3>
              <p className="text-dark-secondary">{item.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50">
          <h2 className="text-3xl font-bold text-dark-primary mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-dark-secondary mb-8 max-w-2xl mx-auto">
            Start with Starter plan free, or try Professional with a 14-day free trial. No credit card required.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="primary">
              Start Your Free Trial
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 bg-dark-secondary/50 px-6 py-12 backdrop-blur">
        <div className="mx-auto max-w-7xl text-center text-sm text-dark-secondary">
          <p>© 2026 GoodDay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
