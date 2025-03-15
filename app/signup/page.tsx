'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUpAction } from '@/server/actions/user'

export default function SignUp() {
    const router = useRouter()

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (data.password !== data.confirmPassword) {
            toast.warning('Password and confirm password do not match')
            return
        }

        try {
            const res = await signUpAction(data.name, data.email, data.password)

            if (res.success) {
                toast.success(res.message)
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })

                router.push('/signin')
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            const err = error as Error
            toast.error(err.message)
            console.error({ err })
        }
    }

    return (
        <div className="flex min-h-[90vh] w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={'flex flex-col gap-6'}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Sign up</CardTitle>
                            <CardDescription>
                                Enter your email and password to sign up
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={data.name}
                                            onChange={e =>
                                                setData({ ...data, name: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            value={data.email}
                                            onChange={e =>
                                                setData({ ...data, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={e =>
                                                setData({ ...data, password: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            required
                                            value={data.confirmPassword}
                                            onChange={e =>
                                                setData({
                                                    ...data,
                                                    confirmPassword: e.target.value
                                                })
                                            }
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Sign up
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?
                                    <Link href="/signin" className="underline underline-offset-4">
                                        Sign In
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
