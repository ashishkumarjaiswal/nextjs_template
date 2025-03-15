'use client'

import { Menu, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const items = [
    {
        name: 'Home',
        href: '/',
        protected: false
    },
    {
        name: 'Order History',
        href: '/history',
        protected: true
    },
    {
        name: 'Request a Template',
        href: '/pricing',
        protected: false
    }
]

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { status } = useSession()

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/" className="text-primary text-xl font-bold">
                                Code Nard
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {items.map((item, index) =>
                                item.protected && status !== 'authenticated' ? null : (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                        {status === 'authenticated' ? (
                            <Button onClick={() => signOut()} className="text-sm font-medium">
                                Sign Out
                            </Button>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <Button variant="ghost" className="text-sm font-medium">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="text-sm font-medium">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="space-y-1 pt-2 pb-3">
                        {items.map((item, index) =>
                            item.protected && status !== 'authenticated' ? null : (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <Link
                                    href="/signin"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Sign in
                                </Link>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link
                                    href="/signup"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
