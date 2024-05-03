'use client';

import { useUser } from '@/utils/hooks/useUser';
import { Layout } from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const { user, currentEmployee } = useUser();

  if (!user) {
    return (
      <Layout>
        <div className='mx-auto mt-5 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Войдите в аккаунт или зареристрируйтесь
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Для использовния платформы необходимо войти в уже существующий
            аккаунт или создать новый
          </p>
          <Link
            href='/login'
            className='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Войти
            <svg
              className='ms-2 h-3.5 w-3.5 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </Link>
        </div>
      </Layout>
    );
  }

  const onAddSkill = async () => {
    const res = await axios.patch(
      'app/employees/skills/add?skillName=Ответственность&level=A'
    );
    console.log('res patch', res);
  };

  return (
    <Layout>
      <div className='container mx-auto py-4'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-1 rounded bg-gray-200 p-4'>
            <h2 className='mb-2 text-lg font-semibold'>Данные пользователя</h2>
            <p className='py-3'>
              Имя:
              <span className='px-2 font-bold'>
                {currentEmployee?.firstName}
              </span>
            </p>
            <p className='pb-3'>
              Фамилия:
              <span className='px-2 font-bold'>
                {currentEmployee?.secondName}
              </span>
            </p>
            <p>
              Номер телефона:
              <span className='px-2 font-bold'>{currentEmployee?.phone}</span>
            </p>
          </div>
          <div className='col-span-2 rounded bg-gray-200 p-4'>
            <h2 className='mb-2 text-lg font-semibold'>Карта компетенций</h2>
            <p onClick={onAddSkill}>Содержимое элемента 2</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
