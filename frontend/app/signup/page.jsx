'use client';

import Image from 'next/image';
import { useState } from 'react';
import register from '../api/auth/register';


const SignUpPage = () => {
  const [formState, setFormState] = useState({
    username: '', email: '', password: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    if (formState.password !== e.target.value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
      setFormState({ ...formState, password: e.target.value });
    }
  };

  const usernameCheck = async () => {
    // Make a request to the server to check if the username exists
    const res = await fetch(`http://localhost:8080/api/v1/clients/client-exists-by-username?username=${formState.username}`);
    const data = await res.json();

    if (data) {
      setUsernameError('Username already exists');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

  return (<section className='login-background'>
    <div className='flex flex-col items-center px-6 py-8 mt-5 '>
      <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
        <Image className='w-8 h-8 mr-2' src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
               alt='logo' width={30} height={30} /> TripPlanner
      </a>
      <div className='p-8 space-y-4 md:space-y-6 sm:p-12'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center'>
          Sign Up
        </h1>
        <form className='space-y-4 md:space-y-6 form_signup' action='#'>
          <div>
            <label htmlFor='username'
                   className='block mb-2 text-sm font-medium text-gray-900'>Username</label>
            <input type='username' name='username' id='username' placeholder='Username'
                   className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                   required='' value={formState.username}
                   onChange={(e) => setFormState({ ...formState, username: e.target.value })}
            ></input>
            {usernameError && <div className='text-red-500'>{usernameError}</div>}
          </div>
          <div>
            <label htmlFor='email'
                   className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
            <input type='email' name='email' id='email' placeholder='Email'
                   className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                   required='' value={formState.email}
                   onChange={(e) => setFormState({ ...formState, email: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor='password'
                   className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
            <input type='password' name='password' id='password' placeholder='*******'
                   className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                   required='' value={formState.password}
                   onChange={(e) => setFormState({ ...formState, password: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor='repeat-password'
                   className='block mb-2 text-sm font-medium text-gray-900'>Repeat Password</label>
            <input type='password' name='repeat-password' id='repeat-password' placeholder='*******'
                   className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                   required='' onChange={handlePasswordChange}></input>
            {!passwordsMatch && <div className='text-red-500'>Passwords do not match</div>}
          </div>
          <button
            type={'submit'}
            key={'provider.name'}
            onClick={async () => {
              const res = await usernameCheck();
              if (res) {
                await register({ username: formState.username, email: formState.email, password: formState.password });
              }
            }}
            className={'w-full submit_btn'}
          >
            Sign up
          </button>

        </form>
      </div>

    </div>
  </section>);
};

export default SignUpPage;