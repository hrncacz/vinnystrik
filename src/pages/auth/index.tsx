import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import LoginFormWithHooks from '@/components/LoginFormHook';
import { checkSession } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sessionStatus = await checkSession(req.cookies);
  if (sessionStatus === true) {
    return { redirect: { destination: '/customer', permanent: false } };
  }
  return { props: { data: 'test' } };
};

export default function Auth() {
  return (
    <main className='h-screen w-screen bg-primary-content'>
      <Navbar></Navbar>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        {/* <LoginForm></LoginForm> */}
        <LoginFormWithHooks></LoginFormWithHooks>
      </div>
    </main>
  );
}
