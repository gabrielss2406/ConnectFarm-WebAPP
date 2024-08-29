import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('_cnctfarm_token');

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/painel/:path*'],
};