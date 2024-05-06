'use client';

import { Layout } from '@/components/Layout';
import { useUser } from '@/utils/hooks/useUser';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { IProject } from '@/types/project';
import dayjs from 'dayjs';

const ProjectsPage = () => {
  const { isManager, isAdmin } = useUser();
  const { push } = useRouter();
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState<IProject>({
    name: '',
    deadline: '',
    description: '',
  });

  const getProjects = () => {
    axios.get('app/projects').then(({ data }) => setProjects(data));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setNewProject((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const onAddNewProject = (event: any) => {
    event.preventDefault();
    axios
      .post(`app/projects/create`, {
        ...newProject,
        deadline: dayjs(newProject?.deadline).format('DD-MM-YYYY'),
      })
      .then(() => {
        getProjects();
        setIsOpen(false);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <Layout>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='mt-4 text-4xl font-extrabold dark:text-white'>
              Проекты
            </h2>
            <p className='mt-4 text-lg text-gray-500'>
              Здесь будут указаны проекты вы принимаете участие
            </p>
            <p className='mb-4 text-lg text-gray-500'>
              {(isManager || isAdmin) && 'Или вы можете создать новый'}
            </p>
          </div>
          {(isManager || isAdmin) && (
            <button
              className='rounded-full bg-white p-3'
              onClick={() => setIsOpen(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </button>
          )}
        </div>
        {!projects.length ? (
          <div className='mx-auto max-w-2xl overflow-hidden bg-white p-5 shadow sm:rounded-lg'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              На текущий момент у вас отсутствуют назначенные на вас проекты
            </h3>
          </div>
        ) : (
          <div className='relative overflow-x-auto'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Название проекта
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Описание
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Крайний срок
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects?.map(({ id, name, description, deadline }) => (
                  <tr
                    key={id}
                    onClick={() => push(`projects/${id}`)}
                    className='bg-white dark:bg-gray-800'
                  >
                    <th
                      scope='row'
                      className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                    >
                      {name}
                    </th>
                    <td className='px-6 py-4'>{description}</td>
                    <td className='px-6 py-4'>{deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
      {isOpen && (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
            <div className='relative max-h-full w-full max-w-md p-4'>
              <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
                <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Добавить новый проект
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
                        placeholder='Напишите название проекта'
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
                          setNewProject((prevState) => ({
                            ...prevState,
                            description: event.target.value,
                          }))
                        }
                        id='description'
                        rows={4}
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                        placeholder='Напишите описание проекта'
                        required
                      ></textarea>
                    </div>
                    <div className='col-span-2'>
                      <label
                        htmlFor='description'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Дедлайн
                      </label>
                      <input
                        onChange={handleInput}
                        type='date'
                        name='deadline'
                        id='deadline'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                        placeholder='Укажите крайний срок завершения проекта'
                        required
                      />
                    </div>
                  </div>
                  <button
                    onClick={onAddNewProject}
                    disabled={
                      !newProject?.name ||
                      !newProject?.description ||
                      !newProject?.deadline
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
                    Добавить проект
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

export default ProjectsPage;
