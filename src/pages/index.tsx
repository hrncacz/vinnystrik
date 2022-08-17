import type { NextPage } from 'next';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='indexPage fl-row-center-center'>
      <div className='landing-header fl-col-center-center'>
        <h1>Nadpis index.tsx</h1>
        <h3 className=''>Podnadpis index.tsx</h3>
        <Link href='/products'>
          <i className='btn-primary'>Naše produkty</i>
        </Link>
      </div>
    </div>
  );
};

export default Home;
