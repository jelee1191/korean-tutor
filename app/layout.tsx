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
      <body className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
        <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  한
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Korean Tutor
                  </h1>
                  <p className="text-xs text-gray-500">Learn vocabulary effectively</p>
                </div>
              </Link>
              <div className="flex gap-2">
                <Link
                  href="/"
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all rounded-lg hover:bg-indigo-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/practice"
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all rounded-lg hover:bg-indigo-50"
                >
                  Practice
                </Link>
                <Link
                  href="/words"
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all rounded-lg hover:bg-indigo-50"
                >
                  Words
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
      </body>
    </html>
  )
}
