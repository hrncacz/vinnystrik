import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import LoginForm from '@/components/LoginForm';
import checkSession from '@/lib/auth/checkSession';
import CookiesAgreement from '@/components/CookiesAgreement';

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
    <main className=''>
      <Navbar></Navbar>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        {/* <LoginForm></LoginForm> */}
        <LoginForm></LoginForm>
      </div>
      <CookiesAgreement />
    </main>
  );
}
