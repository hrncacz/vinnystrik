import Menu from './Menu';

const Navbar = () => {
  return (
    <div className='w-full h-16 flex flex-row justify-between items-center px-8 wave'>
      <div>LOGO</div>
      <Menu></Menu>
    </div>
  );
};

export default Navbar;
