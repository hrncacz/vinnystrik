import useUserStore from './context/userCtx';

const ActiveUser = () => {
  const [firstName, lastName, updateNames] = useUserStore((state) => [
    state.firstName,
    state.lastName,
    state.updateNames,
  ]);
  return (
    <div>
      <button
        className='btn btn-secondary'
        onClick={(e) => {
          updateNames('Martin', 'Hrnčiřík');
        }}
      >
        Doplň
      </button>
      <button
        className='btn btn-secondary'
        onClick={(e) => {
          updateNames('', '');
        }}
      >
        Smaž
      </button>
      {firstName}---{lastName}
    </div>
  );
};

export default ActiveUser;
