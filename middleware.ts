import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { env } from './env'

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: env.NEXTAUTH_SECRET
    })

    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/signup', request.url))
        }
    }

    if (unprotectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/signup', '/signin']
}

const protectedRoutes = ['/dashboard']
const unprotectedRoutes = ['/signup', '/signin']
