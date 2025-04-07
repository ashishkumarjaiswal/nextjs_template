import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { env } from './env'

const publicRoutes = ['/signin', '/signup']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const isPublicRoute = publicRoutes.includes(pathname)

    try {
        const token = await getToken({
            req: request,
            secret: env.NEXTAUTH_SECRET
        })

        if (token && isPublicRoute) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        if (!token && !isPublicRoute) {
            return NextResponse.redirect(new URL('/signin', request.url))
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Authentication error:', error)
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public/).*)']
}
