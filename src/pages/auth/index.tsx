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
      <main className='h-screen w-screen bg-slate-400'>
        <Link href='/'>Index</Link>
        <Link href='/customer'>Customer</Link>
      </main>
    </>
  );
}
