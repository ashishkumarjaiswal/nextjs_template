'use server'

import { getUser, signUp } from '../functions/user'

export const signUpAction = async (name: string, email: string, password: string) => {
    return await signUp(name, email, password)
}

export const getUserAction = async () => {
    return await getUser()
}
