'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (res && res.ok) {
                setData({
                    email: '',
                    password: ''
                })

                router.push('/')
            } else {
                alert(res?.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link
                            href="/sign-up"
                            className="text-primary hover:text-primary/90 font-medium"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label
                                htmlFor="email-address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </Label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1"
                                placeholder="name@example.com"
                                value={data.email}
                                onChange={e => setData({ ...data, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={e => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                href="#"
                                className="text-primary hover:text-primary/90 font-medium"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
