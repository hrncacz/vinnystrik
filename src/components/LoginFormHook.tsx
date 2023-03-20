import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginDataSchema = z.object({
  email: z.string().email(),
  passwd: z.string(),
});

type LoginDataSchemaType = z.infer<typeof LoginDataSchema>;

const LoginFormWithHooks = () => {
  const [responseError, setResponseError] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginDataSchemaType>({
    resolver: zodResolver(LoginDataSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginDataSchemaType> = async (data) => {
    await new Promise(async (resolve) => {
      let headers = new Headers();
      headers.append('Content-type', 'application/json');
      headers.append('auth-email', data.email);
      headers.append('auth-passwd', data.passwd);
      const res = await fetch('/api/auth', {
        method: 'GET',
        headers,
      });
      const resText = await res.json();
      if (resText.name !== null) {
        console.log('kundus');
        return router.push('/customer');
      }
      setResponseError(resText.message);
      resetField('passwd');
      return resolve(undefined);
    });
  };

  return (
    <div className='h-2/5 w-1/5 bg-slate-300 rounded-md'>
      <form
        className='flex flex-col justify-center items-center space-y-4 w-full h-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-slate-900 text-lg font-bold'>Přihlášení</div>

        <input
          className={`h-10 w-4/5 bg-slate-100 rounded-md px-4 focus:outline-none focus:ring ${
            errors.email && 'ring-red-400'
          }`}
          type='text'
          placeholder='Email'
          spellCheck='false'
          {...register('email')}
        />
        <input
          className='h-10 w-4/5 bg-slate-100 rounded-md px-4 focus:outline-none focus:ring'
          placeholder='Heslo'
          type='password'
          {...register('passwd')}
        />
        <button
          type='submit'
          className='bg-blue-300 py-4 px-8 rounded-md font-medium'
          disabled={errors.email && true}
        >
          Log in
        </button>
        {responseError && (
          <p className='text-red-500'>Error: {responseError}</p>
        )}
      </form>
    </div>
  );
};

export default LoginFormWithHooks;
