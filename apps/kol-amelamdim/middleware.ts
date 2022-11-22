import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminToken');

  if (!adminToken) {
    return NextResponse.redirect(new URL('/404', request.nextUrl));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
