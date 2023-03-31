import { prisma } from '@/db';
import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';
import * as argon2 from 'argon2';

const checkSession = async (cookies: Partial<{ [key: string]: string }>) => {
  const token = cookies['session-token'];
  if (token) {
    return true;
  }
  return false;
};

export default checkSession;
