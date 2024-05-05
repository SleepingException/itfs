'use client';

import { Layout } from '@/components/Layout';
import { E_SKILL_TYPE, ISkill } from '@/types/skill';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

const CompetenciesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ISkill[]>([]);
  const [newSkill, setNewSkill] = useState<ISkill | {}>({});

  const getData = () => {
    return axios.get('app/skills').then(({ data }) => setData(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const softSkills = data?.filter(({ type }) => type !== E_SKILL_TYPE.HARD);
  const hardSkills = data?.filter(({ type }) => type !== E_SKILL_TYPE.SOFT);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setNewSkill((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const onAddNewSkill = (event: any) => {
    event.preventDefault();
    axios.post('app/skills/create', newSkill).then((skill) => {
      getData().then(() => setIsOpen(false));
    });
  };

  return (
    <>
      <Layout>
        <div className='container mx-auto py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className=' col-span-1 rounded bg-white px-4 py-4 shadow-md'>
              <h2 className='mb-4 text-xl font-semibold'>Soft-скиллы</h2>
              <ul className='grid grid-cols-1 divide-y'>
                {softSkills?.map((item, index) => (
                  <li key={index} className='mb-4 flex flex-col'>
                    <span className='mb-1 mt-3 font-semibold'>Название:</span>
                    <span className='ps-1'>{item.name}</span>
                    <span className='mb-1 mt-3 font-semibold'>Описание:</span>
                    <span className='ps-1'>{item.description}</span>
                  </li>
                ))}
              </ul>
              <button
                className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                onClick={() => {
                  setNewSkill({ type: E_SKILL_TYPE.SOFT });
                  setIsOpen(true);
                }}
              >
                Добавить
              </button>
            </div>
            <div className='col-span-1 rounded bg-white px-4 py-4 shadow-md'>
              <h2 className='mb-4 text-xl font-semibold'>Hard-скиллы</h2>
              <ul className='grid grid-cols-1 divide-y'>
                {hardSkills?.map((item, index) => (
                  <li key={index} className='mb-4 flex flex-col'>
                    <span className='mb-1 mt-3 font-semibold'>Название:</span>
                    <span className='ps-1'>{item.name}</span>
                    <span className='mb-1 mt-3 font-semibold'>Описание:</span>
                    <span className='ps-1'>{item.description}</span>
                  </li>
                ))}
              </ul>
              <button
                data-modal-target='crud-modal'
                data-modal-toggle='crud-modal'
                className='block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
                onClick={() => {
                  setNewSkill({ type: E_SKILL_TYPE.HARD });
                  setIsOpen(true);
                }}
              >
                Добавить
              </button>
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
                    Добавить новый скилл
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
                      <label
                        htmlFor='name'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Название
                      </label>
                      <input
                        onChange={handleInput}
                        type='text'
                        name='name'
                        id='name'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                        placeholder='Напишите название скилла'
                        required
                      />
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='description'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Описание
                      </label>
                      <textarea
                        onChange={(event) =>
                          setNewSkill((prevState) => ({
                            ...prevState,
                            description: event.target.value,
                          }))
                        }
                        id='description'
                        rows={4}
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        placeholder='Напишите описание скилла'
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={onAddNewSkill}
                    // @ts-ignore
                    disabled={!newSkill?.name || !newSkill?.description}
                    type='submit'
                    className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
                    Добавить скилл
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
};

export default CompetenciesPage;
