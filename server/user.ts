import connect_db from './database'
import UserModel from './database/models/user'

export const signUp = async (name: string, email: string, password: string) => {
    try {
        await connect_db()
        const user = await UserModel.findOne({ email })

        if (user) {
            throw new Error('User already exists')
        }

        const newUser = new UserModel({ name, email, password })
        await newUser.save()

        return { success: true, message: 'User created successfully', data: null }
    } catch (error) {
        const err = error as Error
        console.error(err)
        return { success: false, message: err.message, data: null }
    }
}
