// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import Cookies from 'cookies';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/db';
import createSessionCookie from '@/lib/auth/createSession';
import logout from '@/lib/auth/logout';

const OutputGetAuth = z.object({
  name: z.string().email().nullable(),
  message: z.string().nullable(),
});

export type OutputGetAuth = z.infer<typeof OutputGetAuth>;

type InputGetAuth = {
  username: string;
  password: string;
};

type OutputPostAuth = {
  name: string | null;
  message: string | null;
};

export type OutputDeleteAuth = {
  success: boolean;
};

type InputPostAuth = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method === 'GET') {
  //   return await authGet(req, res);
  // }

  switch (req.method) {
    case 'GET':
      await authGet(req, res);
      break;
    case 'POST':
      await authPost(req, res);
      break;
    case 'DELETE':
      await authDelete(req, res);
      break;
    default:
      res.status(405).json({
        name: null,
        message: `HTTP method ${req.method} is not allowed by this endpoint!`,
      });
      break;
  }
}

const authGet = async (
  req: NextApiRequest,
  res: NextApiResponse<OutputGetAuth>
) => {
  const emailHeaderName = 'auth-email';
  const passwordHeaderName = 'auth-passwd';
  const inputData = req.headers;
  const cookies = new Cookies(req, res);

  if (!inputData[emailHeaderName] || !inputData[passwordHeaderName]) {
    return res
      .status(400)
      .json({ name: null, message: 'Missing authentication headers!' });
  }

  if (
    Array.isArray(inputData[emailHeaderName]) ||
    Array.isArray(inputData[passwordHeaderName])
  ) {
    return res.status(400).json({
      name: null,
      message: 'Wrong format of authentication headers!',
    });
  }

  // //DELETE
  // const emailx = inputData[emailHeaderName];
  // const passwdx = inputData[passwordHeaderName];

  // const passwdxHash = await argon2.hash(passwdx);
  // const resultx = await prisma.users.create({
  //   data: {
  //     email: emailx,
  //     passwdHash: passwdxHash,
  //   },
  // });

  const email = inputData[emailHeaderName];
  const password = inputData[passwordHeaderName];

  // const checkPassword = await authenticate({email, password})

  // if (!checkPassword.userExists) {
  //   return res.status(401).json({ name: null, message: 'User was not found!' });
  // }
  // if (!checkPassword.correctPassword) {
  //   return res.status(401).json({ name: null, message: 'Invalid password!' });
  // }

  // const userHasSession = await prisma.session.findFirst({
  //   where: { userId: result.id },
  // });
  // if (userHasSession) {
  //   return res
  //     .status(401)
  //     .json({
  //       name: null,
  //       message: `User has active session - ${userHasSession.sessionUuid}`,
  //     });
  // }
  // const sessionId = uuidv4();
  // cookies.set('session-token', sessionId, {
  //   maxAge: 60000,
  // });
  // await prisma.session.create({
  //   data: { sessionUuid: sessionId, userId: result.id },
  // });
  // return res.status(200).json({ name: result.email, message: null });

  const result = await prisma.users.findFirst({
    where: { email: email },
  });

  if (result) {
    const compare = await argon2.verify(result.passwdHash, password);
    if (compare === true) {
      const session = await prisma.session.findFirst({
        where: { userId: result.id },
      });
      const now = new Date();
      if (session !== null && session.validTill > now) {
        return res.status(401).json({
          name: null,
          message: `User has active session - ${session.sessionUuid}`,
        });
      }
      if (session !== null && session.validTill < now) {
        await logout(req, res);
      }
      try {
        res = await createSessionCookie(req, res, result.id);
      } catch (error) {
        return res.status(401).json({
          name: null,
          message: 'Server was unable to issue session token!',
        });
      }
      return res.status(200).json({ name: result.email, message: null });
    }
    return res.status(401).json({ name: null, message: 'Invalid password!' });
  }

  return res.status(401).json({ name: null, message: 'User was not found!' });
};

const authPost = async (
  req: NextApiRequest,
  res: NextApiResponse<OutputPostAuth>
) => {
  const cookies = new Cookies(req, res);
  const emailHeaderName = 'auth-email';
  const passwordHeaderName = 'auth-passwd';
  const inputData = req.headers;
  const sessionToken = cookies.get('session-token');

  if (
    !inputData[emailHeaderName] ||
    !inputData[passwordHeaderName] ||
    !sessionToken
  ) {
    return res
      .status(400)
      .json({ name: null, message: 'Missing mandatory headers!' });
  }
  if (
    Array.isArray(inputData[emailHeaderName]) ||
    Array.isArray(inputData[passwordHeaderName])
  ) {
    return res.status(400).json({
      name: null,
      message: 'Wrong format of authentication headers!',
    });
  }

  const isAdmin = await prisma.session.findFirst({
    where: { sessionUuid: sessionToken },
  });

  if (!isAdmin || isAdmin.userId !== 1) {
    return res.status(401).json({
      name: null,
      message: 'User is not authorized for this operation!',
    });
  }

  const email = inputData[emailHeaderName];
  const passwd = inputData[passwordHeaderName];
  const passwdHash = await argon2.hash(passwd);
  const result = await prisma.users.create({
    data: {
      email: email,
      passwdHash: passwdHash,
    },
  });

  if (result) {
    return res.status(200).json({ name: result.email, message: null });
  } else {
    return res
      .status(401)
      .json({ name: null, message: 'User was not created!' });
  }
};

const authDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<OutputDeleteAuth>
) => {
  const cookies = new Cookies(req, res);
  const sessionToken = cookies.get('session-token');
  console.log(`DELETE TOKEN ------ ${sessionToken}`);
  if (sessionToken) {
    await logout(req, res);
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false });
};
