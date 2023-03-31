import Head from 'next/head';
import { NextRequest } from 'next/server';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import Cookies from 'cookies';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Vinný střik</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-screen w-screen bg-primary-content'>
        <Navbar></Navbar>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <Link className='btn btn-primary ' href='/auth'>
            LOG IN
          </Link>
        </div>
      </main>
    </>
  );
}
