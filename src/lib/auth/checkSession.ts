import { prisma } from '@/db';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';
import * as argon2 from 'argon2';

const checkSession = async (cookies: Partial<{ [key: string]: string }>) => {
  const token = cookies['session-token'];
  if (token) {
    const session = await prisma.session.findFirst({
      where: { sessionUuid: token },
    });
    if (session) {
      const now = new Date();
      if (session.validTill > now) {
        try {
          await prisma.session.update({
            where: { sessionUuid: token },
            data: {
              validTill: new Date(new Date().getTime() + 60000).toISOString(),
            },
          });
          return true;
        } catch (error) {
          return true;
        }
      }
      return false;
    }
    return false;
  }
  return false;
};

export default checkSession;
