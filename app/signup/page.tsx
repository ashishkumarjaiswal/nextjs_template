'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpAction } from '@/server/actions/user'

export default function SignUp() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match')
            return
        }

        try {
            const res = await signUpAction(data.name, data.email, data.password)

            if (res.success) {
                alert(res.message)
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
            } else {
                alert(res.message)
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
                        Create a new account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link
                            href="/sign-in"
                            className="text-primary hover:text-primary/90 font-medium"
                        >
                            sign in to your existing account
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="mt-1"
                                placeholder="John Doe"
                                value={data.name}
                                onChange={e => setData({ ...data, name: e.target.value })}
                            />
                        </div>
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
                                autoComplete="new-password"
                                required
                                className="mt-1"
                                value={data.password}
                                onChange={e => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1"
                                value={data.confirmPassword}
                                onChange={e =>
                                    setData({ ...data, confirmPassword: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
