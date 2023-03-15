import Cookies from 'cookies';
import { url } from 'inspector';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session-token');
  if (sessionToken) {
    return NextResponse.next().cookies.set(
      sessionToken.name,
      sessionToken.value,
      { maxAge: 60000 }
    );
  }
  return NextResponse.redirect(new URL('http://localhost:3000/auth'));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/customer/:path*'],
};
