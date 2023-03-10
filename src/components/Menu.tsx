import Link from 'next/link';

const Menu = () => {
  return (
    <div className='flex flex-row justify-center items-center space-x-4'>
      <Link href='/customer'>ITEM1</Link>
      <div>item2</div>
      <div>item3</div>
    </div>
  );
};

export default Menu;
