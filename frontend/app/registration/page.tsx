'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/navigation';

const Registration = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const { push } = useRouter();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`app/users/register`, {
      method: 'POST',
      body: JSON.stringify(formState),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    if (response.ok) {
      toast.success(
        'Вы успешно создали аккаунт! Вы будете перенаправлены на страницу авторизации'
      );

      return setTimeout(() => push('/login'), 5000);
    }

    const data = await response.json();

    if (data?.message) {
      return toast.error(data.message);
    }

    return toast.error('Ошибка на сервере. Попробуйте позже');
  }

  return (
    <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
      <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
        <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
            Зарегистрироваться
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
            <div>
              <input
                type='text'
                name='username'
                id='username'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                placeholder='Имя пользователя'
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='firstName'
                id='firstName'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                placeholder='Фамилия'
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <input
                type='text'
                name='secondName'
                id='secondName'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                placeholder='Имя'
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <input
                type='tel'
                name='phone'
                id='phone'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                placeholder='Номер телефона'
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Пароль'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                onChange={handleInput}
                required
              />
            </div>
            <button
              type='submit'
              className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Создать аккаунт
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Уже зарегистрированы?{' '}
              <Link
                href={'/login'}
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Войти
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
