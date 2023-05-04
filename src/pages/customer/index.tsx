import { Inter } from 'next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import checkSession from '@/lib/auth/checkSession';
import logout from '@/lib/auth/logout';
import Navbar from '@/components/Navbar';
import CookiesAgreement from '@/components/CookiesAgreement';
import ActiveUser from '@/components/ActiveUser';
import useUserStore from '@/components/context/userCtx';

type ServerSidePropsType = {
  isAuth: boolean;
  userState: { id: string; email: string };
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  console.log(`/CUSTOMER`);
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
    return {
      props: {
        isAuth: sessionStatus,
        userState: { id: '1', email: 'martin@hrneczek.cz' },
      },
    };
  }
};

// InferGetServerSidePropsType<typeof getServerSideProps>

export default function Customer({ isAuth, userState }: ServerSidePropsType) {
  const updateNames = useUserStore((state) => state.updateNames);
  updateNames(userState.id, userState.email);
  console.log('Bla');

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
        <ActiveUser />
      </div>
      <CookiesAgreement />
    </main>
  );
}
