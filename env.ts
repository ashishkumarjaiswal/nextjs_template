import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        // App
        NEXTAUTH_SECRET: z.string().min(1),
        NEXTAUTH_URL: z.string().url(),
        DATABASE_URL: z.string().min(10)
    },
    client: {
        NEXT_PUBLIC_PRODUCTION: z.string().min(1),
        NEXT_PUBLIC_URL: z.string().url()
    },
    runtimeEnv: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_PRODUCTION: process.env.NEXT_PUBLIC_PRODUCTION,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
    }
})
