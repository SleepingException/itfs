'use client';

import { useUser } from '@/utils/hooks/useUser';
import { Layout } from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ISkill } from '@/types/skill';
import { E_LEVEL, ILevels } from '@/types/levels';

export default function Home() {
  const { user, currentEmployee, refetchCurrentEmployee } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [newSkill, setNewSkill] = useState<{
    skillName?: string;
    level?: E_LEVEL;
  }>({});
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [levels, setLevels] = useState<ILevels[]>([]);
  const getSkills = () => {
    return axios.get('app/skills').then(({ data }) => setSkills(data));
  };

  const getLevels = () => {
    return axios.get('app/skills/levels').then(({ data }) => setLevels(data));
  };

  const onAddNewSkill = async (event: any) => {
    event.preventDefault();
    const res = await axios.patch(
      `app/employees/skills/add?skillName=${newSkill?.skillName}&level=${newSkill?.level}`
    );
    console.log('res patch', res);
    refetchCurrentEmployee().then(() => setIsOpen(false));
  };

  useEffect(() => {
    if (!isOpen) return;
    getSkills();
  }, [isOpen]);

  useEffect(() => {
    getLevels();
  }, []);

  if (!user) {
    return (
      <Layout>
        <div className='mx-auto mt-5 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Войдите в аккаунт или зарегистрируйтесь
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Для использования платформы необходимо войти в уже существующий
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

  return (
    <>
      <Layout>
        <div className='container mx-auto py-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-1 rounded p-5 shadow-lg'>
              <h2 className='mb-2 text-xl font-bold'>Данные пользователя</h2>
              <p className='py-3 font-semibold'>
                Имя:
                <span className='px-2 text-base text-gray-700'>
                  {currentEmployee?.firstName}
                </span>
              </p>
              <p className='pb-3 font-semibold'>
                Фамилия:
                <span className='px-2 text-base text-gray-700'>
                  {currentEmployee?.secondName}
                </span>
              </p>
              <p className='font-semibold'>
                Номер телефона:
                <span className='px-2 text-base text-gray-700'>
                  {currentEmployee?.phone}
                </span>
              </p>
            </div>
            <div className='col-span-2 rounded p-5 shadow-lg'>
              <div className='grid-rows-2-2 grid gap-4'>
                <div className='flex content-center justify-between'>
                  <h2 className='text-xl font-bold'>Карта компетенций</h2>
                  <button
                    type='button'
                    className='mb-4 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    onClick={() => setIsOpen(true)}
                  >
                    Добавить
                  </button>
                </div>

                <div className='mb-4 flex flex-col rounded rounded p-5 px-4 py-4 shadow-md'>
                  <div className='col-span-1 rounded px-4 py-4'>
                    <h2 className='mb-4 text-lg font-semibold'>Soft-скиллы</h2>
                    <ul className='grid grid-cols-1 divide-y'>
                      {currentEmployee?.softSkills?.map((item, index) => (
                        <li key={index} className='mb-4 flex flex-col'>
                          <span className='mb-1 mt-3 font-semibold'>
                            Название:
                          </span>
                          <span className='ps-1'>{item.name}</span>
                          <span className='mb-1 mt-3 font-semibold'>
                            Описание:
                          </span>
                          <span className='ps-1'>{item.description}</span>
                          <span className='mb-1 mt-3 font-semibold'>
                            Уровень владения:
                          </span>
                          <span className='ps-1'>
                            {
                              levels?.find(
                                ({ level }) => level === item.skillLevel
                              )?.levelName
                            }
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='col-span-1 rounded px-4 py-4'>
                    <h2 className='mb-4 text-lg font-semibold'>Hard-скиллы</h2>
                    <ul className='grid grid-cols-1 divide-y'>
                      {currentEmployee?.hardSkills?.map((item, index) => (
                        <li key={index} className='mb-4 flex flex-col'>
                          <span className='mb-1 mt-3 font-semibold'>
                            Название:
                          </span>
                          <span className='ps-1'>{item.name}</span>
                          <span className='mb-1 mt-3 font-semibold'>
                            Описание:
                          </span>
                          <span className='ps-1'>{item.description}</span>
                          <span className='ps-1'>
                            {
                              levels?.find(
                                ({ level }) => level === item.skillLevel
                              )?.levelName
                            }
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {isOpen && (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative max-h-full w-full max-w-md p-4'>
              <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
                <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Добавление новой компетенции
                  </h3>
                  <button
                    type='button'
                    className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                    data-modal-toggle='crud-modal'
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className='h-3 w-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 14 14'
                    >
                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                      />
                    </svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                </div>
                <form className='p-4 md:p-5'>
                  <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div className='col-span-2'>
                      <select
                        id='skillName'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        onChange={(e) => {
                          setNewSkill((prevState) => ({
                            ...prevState,
                            skillName: e.target.value as E_LEVEL,
                          }));
                        }}
                      >
                        <option value={'undefined'}>
                          Выберите компетенцию
                        </option>
                        {skills?.map(({ name }) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {newSkill?.skillName &&
                      newSkill.skillName !== 'undefined' && (
                        <div className='col-span-2'>
                          <select
                            id='skillName'
                            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                            onChange={(e) => {
                              setNewSkill((prevState) => ({
                                ...prevState,
                                level: e.target.value as E_LEVEL,
                              }));
                            }}
                          >
                            <option value={'undefined'}>
                              Выберите уровень владения данным навыком
                            </option>
                            {levels?.map(({ id, level, levelName }) => (
                              <option key={id} value={level}>
                                {levelName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                  </div>
                  <button
                    onClick={onAddNewSkill}
                    disabled={
                      !newSkill?.skillName ||
                      !newSkill?.level ||
                      newSkill?.skillName === 'undefined' ||
                      newSkill?.level === ('undefined' as E_LEVEL)
                    }
                    type='submit'
                    className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    <svg
                      className='-ms-1 me-1 h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                    Добавить компетенцию
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      )}
    </>
  );
}
