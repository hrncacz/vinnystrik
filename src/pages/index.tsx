import Head from 'next/head';
import Image from 'next/image';
import winePic from '/public/images/heroPhoto.webp';
import Navbar from '@/components/Navbar';
import CookiesAgreement from '@/components/CookiesAgreement';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vinný střik</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=''>
        <Navbar />
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <div className='hero min-h-screen bg-base-200'>
            <div className='hero-content flex-col lg:flex-row'>
              <Image
                alt=''
                src={winePic}
                className='max-w-sm rounded-lg shadow-2xl'
              />
              <div>
                <h1 className='text-5xl font-bold'>Box Office News!</h1>
                <p className='py-6'>
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className='btn btn-primary'>Get Started</button>
              </div>
            </div>
          </div>
        </div>
        <CookiesAgreement />
      </main>
    </>
  );
}
