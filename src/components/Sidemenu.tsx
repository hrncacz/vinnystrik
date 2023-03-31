import Link from 'next/link';

const SideMenu = () => {
  return (
    <div className='flex flex-row justify-center items-center space-x-4 '>
      <Link href='/customer/profile'>Profil</Link>
      <Link href='/customer/orders'>Zákaznická sekce</Link>
      <Link href='/auth/signUp'>Registrace</Link>
    </div>
  );
};

export default SideMenu;
