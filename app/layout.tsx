import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import { Toaster } from '@/components/ui/sonner'
import { getSession } from '@/server/auth'

import './globals.css'
import Providers from './Providers'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-inter'
})

export const metadata: Metadata = {
    title: 'Title',
    description: 'Description'
}

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getSession()

    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <Providers session={session}>
                    <Navbar />
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}
