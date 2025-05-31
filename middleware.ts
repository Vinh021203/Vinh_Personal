import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './libs/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  try {
    const payload = await verifyToken(token || '');

    console.log('[middleware] role:', payload.role);

    if (req.nextUrl.pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log('[middleware] Token invalid:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
