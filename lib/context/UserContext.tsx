'use client'

import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { getUserAction } from '@/server/actions/user'
import { UserType } from '@/types/database/user'

type UserContextType = {
    user?: UserType
    updateUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>()
    const session = useSession()

    const updateUser = async () => {
        const res = await getUserAction()

        if (res.data) {
            setUser(res.data)
        } else {
            setUser(undefined)
        }
    }

    useEffect(() => {
        updateUser()
    }, [session])

    return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}
