import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@components/providers'

export const metadata: Metadata = {
  title: 'GoodDay - Project Management & Productivity Platform',
  description: 'Modern SaaS platform for project management, task tracking, and team collaboration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
