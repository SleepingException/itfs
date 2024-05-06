'use client';

import { Layout } from '@/components/Layout';
import { E_LEVEL, ILevels } from '@/types/levels';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ISkill } from '@/types/skill';

const ProjectPageId = ({ params }: { params: { id: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [levels, setLevels] = useState<ILevels[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [projects, setProjects] = useState([]);
  const [newSkill, setNewSkill] = useState<{
    skillName?: string;
    level?: E_LEVEL;
  }>({});
  const [startFormationData, setStartFormationData] = useState<{
    withBusyEmployees: boolean;
    teamSize: number;
  }>({ withBusyEmployees: false, teamSize: 0 });

  console.log('startFormationData', startFormationData);

  const currentProject = projects?.find(({ id }) => id === Number(params.id));

  console.log('currentProject', currentProject);

  const getProjects = () => {
    axios.get('app/projects').then(({ data }) => setProjects(data));
  };

  const getLevels = () => {
    return axios
      .get('http://localhost:8080/app/skills/levels')
      .then(({ data }: { data: ILevels[] }) => setLevels(data));
  };

  const getSkills = () => {
    return axios
      .get('http://localhost:8080/app/skills')
      .then(({ data }: { data: ISkill[] }) => setSkills(data));
  };

  const onAddNewSkill = (event: any) => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:8080/app/projects/${params.id}/skills?skillName=${newSkill?.skillName}&level=${newSkill?.level}`
      )
      .then(() => getProjects());
  };

  useEffect(() => {
    if (!isOpen) return;
    getSkills();
  }, [isOpen]);

  useEffect(() => {
    getLevels();
    getProjects();
  }, []);

  return (
    <>
      <Layout>
        <div className='mt-5 rounded bg-white p-5 shadow-lg'>
          <h2 className='mt-4 text-4xl font-extrabold dark:text-white'>
            Проект: {currentProject?.name}
          </h2>
          <p className='mt-4 text-lg text-gray-500'>
            Описание: {currentProject?.description}
          </p>
          <p className='mt-4 text-lg text-gray-500'>
            Дедлайн: {currentProject?.deadline}
          </p>
          <hr className='my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
          <div className='text-lg font-semibold'>Необходиые навыки</div>
          <div className='mt-4 flex flex-wrap'>
            {currentProject?.hardSkills?.map(({ name }) => (
              <span
                key={name}
                className='me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300'
              >
                {name}
              </span>
            ))}
            {currentProject?.softSkills?.map(({ name }) => (
              <span
                key={name}
                className='me-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400'
              >
                {name}
              </span>
            ))}
            <button
              className='rounded-full bg-white p-1'
              onClick={() => setIsOpen(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='h-4 w-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </button>
          </div>
          <hr className='my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
          <div className='mb-4 text-lg font-semibold'>
            Начать формирование команды
          </div>
          <div className='flex items-center'>
            <div className='flex-col'>
              <label
                htmlFor='name'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
              >
                Укажите размер команды
              </label>
              <input
                placeholder='Укажите размер команды'
                maxLength={2}
                value={startFormationData.teamSize}
                onChange={(event) => {
                  if (!event.target.value) {
                    return setStartFormationData((prevState) => ({
                      ...prevState,
                      teamSize: 0,
                    }));
                  }
                  if (!Number(event.target.value)) return;
                  setStartFormationData((prevState) => ({
                    ...prevState,
                    teamSize: Number(event.target.value),
                  }));
                }}
                className='dark:focus:border-blue-500" block  w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500'
              />
            </div>
            <div className='ml-10 flex items-center'>
              <input
                id='withBusyEmployees'
                name='withBusyEmployees'
                type='checkbox'
                value=''
                onClick={() =>
                  setStartFormationData((prevState) => ({
                    ...prevState,
                    withBusyEmployees: !prevState.withBusyEmployees,
                  }))
                }
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
              />
              <label
                htmlFor='withBusyEmployees'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Учитывать занятых сотрудников
              </label>
            </div>
          </div>
          <button
            className='mt-4 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='button'
          >
            Сформировать
          </button>
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
};

export default ProjectPageId;
