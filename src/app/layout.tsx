import './globals.css'

import { CheckCheck, Settings, SquareChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import { TaskProvider } from '@/contexts/task'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={inter.className}>
      <body className="flex h-screen w-screen flex-col overflow-x-hidden overflow-y-scroll">
        <TaskProvider>
          <header className="flex min-h-52 w-screen bg-gray-700">
            <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-10">
              <h1 className="text-5xl font-extrabold text-yellow-500">TasK</h1>
              <div className="flex gap-2">
                <Link href="/">
                  <button className="rounded-md p-3 transition-colors hover:bg-gray-600">
                    <CheckCheck size={32} />
                  </button>
                </Link>
                <Link href="/history">
                  <button className="rounded-md p-3 transition-colors hover:bg-gray-600">
                    <SquareChevronRight size={32} />
                  </button>
                </Link>
              </div>
            </div>
          </header>
          <main className="h-screen w-screen overflow-visible bg-gray-600">
            <div className="relative mx-auto -mt-7 flex h-full w-full max-w-screen-xl flex-col px-0 sm:px-6 md:px-8 lg:px-10">
              {children}
            </div>
          </main>
        </TaskProvider>
      </body>
    </html>
  )
}
