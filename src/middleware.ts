import { NextRequest, NextResponse } from 'next/server';
import { UserService } from './services/user';

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('_cnctfarm_token');

    await new UserService().authVerify(token);

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/painel/:path*'],
};