'use client'

import { Menu, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const items = [{ name: 'Home', href: '/', protected: false }]

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { status } = useSession()

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 shadow-md backdrop-blur-md dark:border-gray-700 dark:bg-black/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-primary text-xl font-bold">
                        Title
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden items-center space-x-6 sm:flex">
                        {items.map(
                            (item, index) =>
                                (!item.protected || status === 'authenticated') && (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="hover:text-primary text-sm font-medium text-gray-700 transition-colors dark:text-gray-300"
                                    >
                                        {item.name}
                                    </Link>
                                )
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden items-center space-x-4 sm:flex">
                        {status === 'authenticated' ? (
                            <Button onClick={() => signOut()} size="sm" variant="ghost">
                                Sign Out
                            </Button>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <Button variant="ghost" size="sm">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="sm:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="px-4 pb-4 transition-all duration-200 ease-in-out sm:hidden">
                    <div className="mt-2 space-y-2">
                        {items.map(
                            (item, index) =>
                                (!item.protected || status === 'authenticated') && (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                        )}
                    </div>
                    <div className="mt-4 border-t pt-4">
                        {status === 'authenticated' ? (
                            <Button
                                onClick={() => {
                                    setIsMenuOpen(false)
                                    signOut()
                                }}
                                className="w-full"
                                size="sm"
                            >
                                Sign Out
                            </Button>
                        ) : (
                            <div className="space-y-2">
                                <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full" size="sm">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full" size="sm">
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
