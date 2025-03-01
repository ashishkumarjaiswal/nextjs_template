import { AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import UserModel from './database/models/user'

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }

                if (!email || !password) {
                    return null
                }

                const user = await UserModel.findOne({ email })

                if (!user) {
                    throw new Error('User not found')
                }

                if (user && user.password === password) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                } else {
                    throw new Error('Invalid password')
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    }
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
