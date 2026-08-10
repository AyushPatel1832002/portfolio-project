import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink p-6 text-center text-text">
      <h1 className="font-display text-6xl font-bold text-amber">404</h1>
      <h2 className="mt-4 font-mono text-xl text-teal">Page Not Found</h2>
      <p className="mt-2 text-muted">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-amber px-6 py-2.5 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
      >
        Return Home
      </Link>
    </div>
  )
}
