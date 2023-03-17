import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

const emailZ = z.string().email().nullable();
const passwdZ = z.string().min(4).max(16).nullable();

const loginDataZ = z.object({
  email: emailZ,
  passwd: passwdZ,
});

type LoginData = z.infer<typeof loginDataZ>;
type Email = z.infer<typeof emailZ>;
type Passwd = z.infer<typeof passwdZ>;

const LoginForm = () => {
  const [emailColor, setEmailColor] = useState<string | null>(null);
  const [emailState, setEmailState] = useState<boolean>(false);
  const [passwdState, setPasswdState] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: null,
    passwd: null,
  });

  const checkEmail = async (data: Email) => {
    const result = await emailZ.safeParseAsync(data);
    if (result.success === true) {
      setEmailColor('focus:ring-green-300');
      setEmailState(true);
      setLoginData({ ...loginData, email: data });
      return;
    } else {
      setEmailColor('focus:ring-red-300');
      setEmailState(false);
      setLoginData({ ...loginData, email: null });
      return;
    }
  };
  const checkPasswd = async (data: Passwd) => {
    const result = await passwdZ.safeParseAsync(data);
    if (result.success === true) {
      setPasswdState(true);
      setLoginData({ ...loginData, passwd: data });
      return;
    } else {
      setPasswdState(false);
      setLoginData({ ...loginData, passwd: null });
      return;
    }
  };

  const checkSubmit = async (data: LoginData) => {};

  return (
    <div className='h-2/5 w-1/5 bg-slate-300 rounded-md'>
      <form
        className='flex flex-col justify-center items-center space-y-8 w-full h-full'
        action=''
        onSubmit={(e) => {
          e.preventDefault();
          console.log(loginData);
          console.log(e.target);
        }}
      >
        <div className='text-slate-900 text-lg font-bold'>Přihlášení</div>
        <input
          name='email'
          className={`h-10 w-4/5 bg-slate-100 rounded-md px-4 focus:outline-none focus:ring ${emailColor}`}
          type='text'
          placeholder='Email'
          onChange={(e) => {
            checkEmail(e.target.value);
          }}
          spellCheck='false'
        />
        <input
          name='passwd'
          className='h-10 w-4/5 bg-slate-100 rounded-md px-4 focus:outline-none focus:ring'
          placeholder='Heslo'
          type='password'
          onChange={(e) => {
            checkPasswd(e.target.value);
          }}
        />
        <button
          type='submit'
          className='bg-blue-300 py-4 px-8 rounded-md font-medium'
          //   disabled={emailState === false && passwdState === false}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
