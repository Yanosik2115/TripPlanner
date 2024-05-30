'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProviders } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [providers, setProviders] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn('credentials', {
      email: email,
      password: password,
      redirect: '/',
    });
  };


  return (
    <section className='login-background'>
      <div className='flex flex-col items-center px-6 py-8 mt-5 '>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Image className='w-8 h-8 mr-2' src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                 alt='logo' width={30} height={30} /> TripPlanner
        </a>
        <div className='p-8 space-y-4 md:space-y-6 sm:p-12'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
            Sign in to your account
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
            <div>
              <label htmlFor='email'
                     className='block mb-2 text-sm font-medium text-gray-900'>Your
                email</label>
              <input type='email' name='email' id='email'
                     className='sm:text-sm rounded-lg focus:ring-primary-orange focus:border-primary-600 block w-full p-2.5'
                     placeholder='name@company.com' required='' value={email}
                     onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor='password'
                     className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
              <input type='password' name='password' id='password' placeholder='••••••••'
                     className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                     required='' value={password}
                     onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input id='remember' aria-describedby='remember' type='checkbox'
                         className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300'
                         required=''></input>
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='remember' className='text-black'>Remember
                    me</label>
                </div>
              </div>
              <a href='#'
                 className='text-sm font-medium text-primary-600 hover:underline '>Forgot
                password?</a>
            </div>
            <button
              type={'submit'}
              key={'provider.name'}
              onClick={handleSubmit}
              className={'w-full submit_btn'}
            >
              Log In
            </button>

            <div className='flex items-center justify-between'>
              <hr className='flex-grow border-black' />
              <span className='px-2 text-black'>or</span>
              <hr className='flex-grow border-black' />
            </div>

            <button type='button' className='login-with-google-btn' onClick={() => signIn('google')}>
              Sign in with Google
            </button>
            <p className='text-sm font-light text-black '>
              Don’t have an account yet? <a href='/signup'
                                            className='font-medium text-blue-500 hover:underline '>Sign
              up</a>
            </p>
          </form>
        </div>

      </div>
    </section>
  );
};

export default LoginPage;