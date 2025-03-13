import { getSession } from '../auth'
import connect_db from '../database'

export const checkSession = async () => {
    await connect_db()

    const session = await getSession()

    if (!session) {
        throw new Error('User not logged in')
    }

    return session
}
