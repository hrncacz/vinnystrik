import { prisma } from '@/db';
import { OutputGetAuth } from '@/pages/api/auth';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const createSessionCookie = async (
  req: NextApiRequest,
  res: NextApiResponse<OutputGetAuth>,
  userId: number
) => {
  const cookies = new Cookies(req, res);
  const token = uuidv4();
  const validTill = new Date(new Date().getTime() + 60000).toISOString();
  try {
    await prisma.session.create({
      data: { sessionUuid: token, userId, validTill },
    });
    cookies.set('session-token', token, { httpOnly: true });

    return res;
  } catch (error) {
    throw error;
  }
};

export default createSessionCookie;
