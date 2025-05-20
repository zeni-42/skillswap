import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/signup' || path === '/auth/signin' || path === '/'
    const accessToken = request.cookies.get('accessToken')?.value

    if (!isPublicPath && !accessToken) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/auth/:path',
        '/home',
        '/update-skills',
        '/update-avatar'
    ],
}