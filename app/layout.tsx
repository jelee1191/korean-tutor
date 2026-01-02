'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import './globals.css'
import { AuthProvider, useAuth } from '@/lib/AuthContext'
import AuthModal from '@/components/AuthModal'

function Navigation() {
  const { user, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                한
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Korean Tutor
              </h1>
            </Link>
            <div className="flex gap-2 items-center">
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
                Flashcards
              </Link>
              <Link
                href="/grammar"
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all rounded-lg hover:bg-indigo-50"
              >
                Lessons
              </Link>
              <Link
                href="/words"
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all rounded-lg hover:bg-indigo-50"
              >
                Vocab
              </Link>

              {user ? (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-gray-200">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Signed in</div>
                    <div className="text-sm font-semibold text-gray-700 truncate max-w-[150px]">
                      {user.email}
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-700 shadow-md transform hover:scale-105 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showAuthModal && !user && <AuthModal />}
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
        <AuthProvider>
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
