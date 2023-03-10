import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.req.headers.cookie);
  return { props: { data: 'test' } };
};

export default function Customer() {
  return (
    <>
      <main className='h-screen w-screen bg-slate-400'>
        <Link href='/'>Index</Link>
        <Link href='/auth'>Auth</Link>
      </main>
    </>
  );
}
