// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import Cookies from 'cookies';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

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

type InputPostAuth = {
  username: string;
  password: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await authGet(req, res);
  }

  switch (req.method) {
    case 'GET':
      await authGet(req, res);
      break;
    case 'POST':
      await authPost(req, res);
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
  const passwd = inputData[passwordHeaderName];
  const result = await prisma.users.findFirst({
    where: { email: email },
  });

  if (result) {
    const compare = await argon2.verify(result.passwdHash, passwd);
    if (compare === true) {
      const sessionId = uuidv4();
      cookies.set('session-token', sessionId, { maxAge: 60000 });
      await prisma.session.create({
        data: { sessionUuid: sessionId, userId: result.id },
      });
      //return res.status(200).json({ name: result.email, message: null });
      return res.status(200).redirect('localhost:3000/');
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
