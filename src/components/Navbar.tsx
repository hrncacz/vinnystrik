import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <Link href='/'>
          <img src='/assets/logoHrncirikWhite.png' alt='' className=' pl-2' />
        </Link>
      </div>
      <div className='navbar-menu pr-2'>
        <div className='social-platforms'>
          <Link href='/'>
            <img src='/assets/fb.svg' alt='' className='' />
          </Link>
          <Link href='/'>
            <img src='/assets/inst.svg' alt='' />
          </Link>
        </div>
        <ul>
          <li>
            <Link href='/'>ÚVOD</Link>
          </li>
          <li>
            <Link href='/contacts'>KONTAKTY</Link>
          </li>
          <li>
            <Link href='/clients'>ZÁKAZNICKÁ SEKCE</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
