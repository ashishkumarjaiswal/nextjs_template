import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { getSession } from '@/server/auth'

import './globals.css'
import Providers from './Providers'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'Code Nard',
    description: 'Get best templates for you project'
}

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getSession()

    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <Providers session={session}>
                    <Navbar />
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}
