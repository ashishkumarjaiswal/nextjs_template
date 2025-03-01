'use server'

import { signUp } from '../user'

export const signUpAction = async (name: string, email: string, password: string) => {
    return await signUp(name, email, password)
}
