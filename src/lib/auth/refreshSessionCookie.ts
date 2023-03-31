import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';

const refreshSessionCookie = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('session-token');
  cookies.set('session-token', token, { maxAge: 60000 });
  return res;
};

export default refreshSessionCookie;
