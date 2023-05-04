import { prisma } from '@/db';
import { z } from 'zod';
import * as argon2 from 'argon2';

const AuthCredentials = z.object({
  email: z.string().email(),
  password: z.string(),
});

const AuthOutput = z.object({
  userExists: z.boolean(),
  correctPassword: z.boolean(),
});

type AuthCredentials = z.infer<typeof AuthCredentials>;
type AuthOutput = z.infer<typeof AuthOutput>;

const authenticate = async (credentials: AuthCredentials) => {
  let output: AuthOutput = { userExists: false, correctPassword: false };
  const getHash = await prisma.users.findFirst({
    where: { email: credentials.email },
  });

  if (getHash) {
    output.userExists = true;
    const compare = await argon2.verify(
      getHash.passwdHash,
      credentials.password
    );
    if (compare === true) {
      output.correctPassword = true;
      return output;
    }
    return output;
  }
  return output;
};

export default authenticate;
