import mongoose from 'mongoose'

import { env } from '@/env'

declare global {
    var db: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

let cached = global.db

if (!cached) {
    cached = global.db = { conn: null, promise: null }
}

async function connect_db() {
    if (cached.conn) {
        console.log('Using existing database connection')
        return cached.conn
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(env.DATABASE_URL)
    }
    try {
        cached.conn = await cached.promise
        console.log('New database connection created')
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default connect_db
