import { getSession } from '../auth'

export const checkSession = async () => {
    const session = await getSession()

    if (!session) {
        throw new Error('User not logged in')
    }

    return session
}
