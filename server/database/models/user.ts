import { Model, model, models, Schema } from 'mongoose'

import { UserType } from '@/types/database/user'

const schema = new Schema<UserType>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: 'Users',
        toJSON: { virtuals: true }
    }
)

const UserModel: Model<UserType> = models.Users || model<UserType>('Users', schema)

export default UserModel
