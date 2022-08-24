import { PrismaClient, TestTable } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IProps {
  user: TestTable;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const user: TestTable | null = await prisma.testTable.findFirst({
    where: { id: 1 },
  });
  await prisma.$disconnect();

  return { props: { user } };
};

const LoginPage = (props: IProps) => {
  const { name, age } = props.user;
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='client-section fl-col-center-center'>
        <h1>Login page</h1>
        <p>Username: {name}</p>
        <p>Age: {age}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className='client-section fl-col-center-center'>
      <h1>Please Log In</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default LoginPage;
