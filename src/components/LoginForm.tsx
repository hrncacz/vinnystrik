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

const LoginForm = () => {
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
        return router.push('/customer');
      }
      setResponseError(resText.message);
      resetField('passwd');
      return resolve(undefined);
    });
  };

  return (
    <form
      className='form-control flex flex-col justify-center items-center space-y-4 bg-primary h-2/5 w-1/5 '
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='text-slate-900 text-lg font-bold'>Přihlášení</div>

      <label className='input-group w-4/5'>
        <span>Email</span>
        <input
          className={`input input-bordered overflow-hidden ${
            errors.email && 'focus:outline-none focus:ring ring-red-400'
          }`}
          type='text'
          placeholder='user@example.com'
          spellCheck='false'
          {...register('email')}
        />
      </label>
      <label className='input-group w-4/5'>
        <span>Password</span>
        <input
          className='input input-bordered overflow-hidden'
          placeholder='password'
          type='password'
          {...register('passwd')}
        />
      </label>
      <button
        type='submit'
        className='btn btn-secondary'
        disabled={errors.email && true}
      >
        Log in
      </button>
      {responseError && (
        <div className='toast'>
          <div className='alert alert-error'>
            <div>
              <span>Error: {responseError}</span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
