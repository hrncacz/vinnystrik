import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

const checkSession = async (cookies: Partial<{ [key: string]: string }>) => {
  const token = cookies['session-token'];
  if (token) {
    return true;
  }
  return false;
};

const refreshSessionCookie = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('session-token');
  cookies.set('session-token', token, { maxAge: 60000 });
  return res;
};

const logout = async () => {};

const isAdmin = async () => {};

export { checkSession, refreshSessionCookie, logout, isAdmin };
