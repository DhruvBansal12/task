export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gradient mb-4">404</h1>
        <p className="text-dark-secondary text-lg mb-8">Page not found</p>
        <a
          href="/dashboard"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-glow transition-all"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}
