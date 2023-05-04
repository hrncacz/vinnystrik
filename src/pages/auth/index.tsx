import Navbar from '@/components/Navbar';
import { GetServerSideProps } from 'next';
import LoginForm from '@/components/LoginForm';
import checkSession from '@/lib/auth/checkSession';
import CookiesAgreement from '@/components/CookiesAgreement';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  console.log(`/AUTH`);
  console.log(req.headers.cookie);
  const sessionStatus = await checkSession(req.cookies);
  // console.log(`/auth sessionStatus --- ${sessionStatus}`);
  if (sessionStatus === false) {
    // return { redirect: { destination: '/customer', permanent: false } };
    return { props: {} };
  }

  // return { props: {} };
  return { redirect: { destination: '/customer', permanent: false } };
};

export default function Auth() {
  return (
    <main className=''>
      <Navbar></Navbar>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <LoginForm></LoginForm>
      </div>
      <CookiesAgreement />
    </main>
  );
}
