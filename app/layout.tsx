import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Korean Tutor',
  description: 'Personal Korean language learning webapp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <h1 className="text-xl font-bold text-gray-900">한국어 튜터</h1>
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/practice"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Practice
                </Link>
                <Link
                  href="/words"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Words
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
