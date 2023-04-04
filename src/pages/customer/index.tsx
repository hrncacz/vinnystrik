import { Inter } from 'next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
//import refreshSessionCookie from '@/lib/auth/refreshSessionCookie';
import checkSession from '@/lib/auth/checkSession';
import logout from '@/lib/auth/logout';
import Navbar from '@/components/Navbar';
import CookiesAgreement from '@/components/CookiesAgreement';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sessionStatus = await checkSession(req.cookies);
  if (sessionStatus === false) {
    await logout(req, res);
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  } else {
    //res = await refreshSessionCookie(req, res);
    return { props: { isAuth: sessionStatus } };
  }
};

export default function Customer({
  isAuth,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <Navbar />
      <div className='h-screen w-screen flex flex-row justify-center items-center space-x-2'>
        <Link className='btn btn-secondary' href='/'>
          Index
        </Link>
        <Link className='btn btn-secondary' href='/auth'>
          Auth
        </Link>
        {isAuth ? <p>ALLES GUTTE</p> : <p>NOOOOO!!!!!</p>}
      </div>
      <CookiesAgreement />
    </main>
  );
}
