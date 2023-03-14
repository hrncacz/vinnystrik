// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type OutputGetAuth = {
  name: string | null;
  message: string | null;
};

type InputGetAuth = {
  username: string;
  password: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutputGetAuth>
) {
  if (req.method === 'GET') {
    // await prisma.users.create({
    //   data: {
    //     email: 'admin@hrneczek.cz',
    //     passwdHash: 'sdfkljsdůfkljslůfjůgjgůdjfgdůfljg',
    //   },
    // });
    const emailHeaderName = 'auth-email';
    const passwordHeaderName = 'auth-passwd';
    const inputData = req.headers;

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
    const result = await prisma.users.findFirst({
      where: { email: inputData[emailHeaderName] },
    });
    if (result) {
      return res.status(200).json({ name: result.email, message: null });
    } else {
      return res.status(200).json({ name: null, message: 'nic' });
    }
  }
}
