import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import Cookies from 'cookies';
import { OutputGetAuth } from '../api/auth';
import { useState } from 'react';

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

  const login = async () => {};

  return (
    <>
      <main className='h-screen w-screen bg-slate-200'>
        <Navbar></Navbar>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className='h-2/5 w-1/5 bg-slate-300 rounded-md'>
            <form
              className='flex flex-col justify-center items-center space-y-8 w-full h-full'
              action=''
            >
              <div className='text-slate-900 text-lg font-bold'>Přihlášení</div>
              <input
                className='h-10 w-4/5 bg-slate-100 rounded-md px-4'
                type='text'
                placeholder='Uživatelské jméno'
              />
              <input
                className='h-10 w-4/5 bg-slate-100 rounded-md px-4'
                placeholder='Heslo'
                type='password'
              />
              <button className='bg-blue-300 py-4 px-8 rounded-md font-medium'>
                Log in
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
