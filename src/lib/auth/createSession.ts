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
  const validTill = new Date(new Date().getTime() + 120000).toISOString();
  try {
    cookies.set('session-token', token, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 100 * 365 * 24 * 60 * 60 * 1000),
    });
    await prisma.session.create({
      data: { sessionUuid: token, userId, validTill },
    });

    return res;
  } catch (error) {
    await prisma.session.delete({
      where: {
        userId,
      },
    });
    try {
      await prisma.session.create({
        data: { sessionUuid: token, userId, validTill },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
};

export default createSessionCookie;
