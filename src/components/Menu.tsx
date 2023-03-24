import Link from 'next/link';

const Menu = () => {
  return (
    <div className='flex flex-row justify-center items-center space-x-4 '>
      <Link href='/'>Home</Link>
      <Link href='/customer'>Zákaznická sekce</Link>
      <Link href='/auth/signUp'>Registrace</Link>
    </div>
  );
};

export default Menu;
