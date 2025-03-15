'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { UserProvider } from '@/lib/context/UserContext'

export default function Providers({
    session,
    children
}: {
    session: Session | null
    children: React.ReactNode
}) {
    return (
        <SessionProvider session={session}>
            <UserProvider>{children}</UserProvider>
        </SessionProvider>
    )
}
