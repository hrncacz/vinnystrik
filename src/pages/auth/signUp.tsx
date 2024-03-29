import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Cookies from 'cookies';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  cookies.set('session', 'nejakaHodniota', { maxAge: 10000 });
  return { props: { data: 'test' } };
};

export default function Auth() {
  return (
    <>
      <Navbar></Navbar>
      <main className='h-screen w-screen bg-primary-content flex justify-center items-center'>
        <div className='h-2/5 w-1/5 bg-slate-300 rounded-md'>
          <form
            className='flex flex-col justify-center items-center space-y-8 w-full h-full'
            action=''
          >
            <div className='text-slate-900 text-lg font-bold'>
              Registrační formulář
            </div>
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
              Vytvořit uživatele
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
