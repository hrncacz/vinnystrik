import { prisma } from '@/db';

const checkSession = async (cookies: Partial<{ [key: string]: string }>) => {
  const token = cookies['session-token'];
  console.log(`Token uuid --- ${token}`);
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
              validTill: new Date(new Date().getTime() + 120000).toISOString(),
            },
          });
          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    }
    return false;
  }
  return false;
};

export default checkSession;
