import { prisma } from '@/db';
import { OutputGetAuth } from '@/pages/api/auth';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const logout = async (
  req: IncomingMessage | NextApiRequest,
  res: ServerResponse<IncomingMessage> | NextApiResponse<OutputGetAuth>
) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('session-token');
  cookies.set('session-token', token, { maxAge: 0 });
  try {
    await prisma.session.delete({ where: { sessionUuid: token } });
    return res;
  } catch (error) {
    return res;
  }
};

export default logout;
