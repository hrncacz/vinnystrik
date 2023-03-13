import Cookies from 'cookies';
import { url } from 'inspector';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.cookies.get('session')) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('http://localhost:3000/auth'));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/customer/:path*'],
};
