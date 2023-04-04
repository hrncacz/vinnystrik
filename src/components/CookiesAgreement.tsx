import { useEffect, useState } from 'react';

const CookiesAgreement = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const setCookie = () => {
    document.cookie = `accepted-cookies=true;expires=${new Date(
      new Date().getTime() + 100 * 365 * 24 * 60 * 60 * 1000
    )};path/`;
    setAcceptedCookies(true);
    return;
  };

  useEffect(() => {
    const getter = document.cookie;
    if (getter.match(/accepted-cookies=true/gi)) {
      setAcceptedCookies(true);
    }
  }, [, acceptedCookies]);

  return (
    <>
      {acceptedCookies ? null : (
        <div className='alert shadow-lg absolute bottom-0'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-info flex-shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>Allow cookies necessary for webpage to work properly!</span>
          </div>
          <div className='flex-none'>
            <button
              onClick={() => {
                setCookie();
              }}
              className='btn btn-sm btn-primary'
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesAgreement;
