import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import Cookies from 'cookies';
import { OutputGetAuth } from '../api/auth';
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import LoginFormWithHooks from '@/components/LoginFormHook';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  cookies.set('session', 'nejakaHodniota', { maxAge: 60 * 1000 });
  return { props: { data: 'test' } };
};

export default function Auth() {
  const [loginData, setLoginData] = useState<OutputGetAuth>({
    name: null,
    message: null,
  });

  return (
    <>
      <main className='h-screen w-screen bg-slate-200'>
        <Navbar></Navbar>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          {/* <LoginForm></LoginForm> */}
          <LoginFormWithHooks></LoginFormWithHooks>
        </div>
      </main>
    </>
  );
}
