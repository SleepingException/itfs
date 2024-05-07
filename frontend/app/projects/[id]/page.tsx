'use client';

import { Layout } from '@/components/Layout';
import { E_LEVEL, ILevels } from '@/types/levels';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ISkill } from '@/types/skill';
import { IEmployee } from '@/types/employees';

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
  const [formationResult, setFormationResult] = useState<IEmployee[]>([]);

  const currentProject = projects?.find(({ id }) => id === Number(params.id));

  console.log('currentProject', currentProject);

  const getProjects = () => {
    axios
      .get('http://localhost:8080/app/projects')
      .then(({ data }) => setProjects(data));
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
      .then(() => {
        getProjects();
        setIsOpen(false);
      });
  };

  const onStartFormation = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `http://localhost:8080/app/projects/${params.id}/team/start-formation`,
        startFormationData
      )
      .then(({ data }) => setFormationResult(data));
  };

  const onApproveTeam = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `http://localhost:8080/app/projects/${params.id}/team/approve`,
        formationResult
      )
      .then((data) => {
        console.log('XXX data', data);
        getProjects();
      });
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
          <div className='text-lg font-semibold'>Необходимые навыки</div>
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
          {!currentProject?.team?.length && (
            <>
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
                className='mt-4 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
                onClick={onStartFormation}
                disabled={!startFormationData?.teamSize}
              >
                Сформировать
              </button>
            </>
          )}
          {Boolean(formationResult?.length) && (
            <>
              <hr className='my-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
              <div className='mb-4 text-lg font-semibold'>Результат:</div>
              {formationResult?.map((item) => (
                <div
                  key={item.id}
                  className='mb-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'
                >
                  <div className='flex justify-end px-4 pt-4'>
                    <button
                      id='dropdownButton'
                      data-dropdown-toggle='dropdown'
                      className='inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                      type='button'
                    >
                      <span className='sr-only'>Open dropdown</span>
                      <svg
                        className='h-5 w-5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 16 3'
                      >
                        <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                      </svg>
                    </button>
                    <div
                      id='dropdown'
                      className='z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700'
                    >
                      <ul className='py-2' aria-labelledby='dropdownButton'>
                        <li>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Export Data
                          </a>
                        </li>
                        <li>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex flex-col items-center pb-10'>
                    <div className='relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600'>
                      <svg
                        className='absolute -left-1 h-12 w-12 text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                    </div>

                    <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                      {`${item?.firstName} ${item?.secondName}`}
                    </h5>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Средний разработчик
                    </span>

                    <div className='flex flex-wrap'>
                      {item?.hardSkills?.map(({ name, skillLevel }) => (
                        <span
                          key={name}
                          className='me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-base font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300'
                        >
                          {`${name} - ${skillLevel}`}
                        </span>
                      ))}

                      {item?.softSkills?.map(({ name, skillLevel }) => (
                        <span
                          key={name}
                          className='me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-base font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300'
                        >
                          {`${name} - ${skillLevel}`}
                        </span>
                      ))}
                    </div>
                    <div className='mt-4 flex md:mt-6'>
                      <button
                        onClick={() =>
                          setFormationResult((prevState) =>
                            prevState.filter(({ id }) => id !== item.id)
                          )
                        }
                        className='inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      >
                        Убрать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={onApproveTeam}
                className='inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-gray-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Одобрить
              </button>
            </>
          )}
          {Boolean(currentProject?.team?.length) && (
            <>
              <div className='text-lg font-semibold'>
                Сформированная команда:{' '}
              </div>
              {currentProject?.team?.map((item) => (
                <div
                  key={item.id}
                  className='mb-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'
                >
                  <div className='flex justify-end px-4 pt-4'>
                    <button
                      id='dropdownButton'
                      data-dropdown-toggle='dropdown'
                      className='inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                      type='button'
                    >
                      <span className='sr-only'>Open dropdown</span>
                      <svg
                        className='h-5 w-5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 16 3'
                      >
                        <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                      </svg>
                    </button>
                    <div
                      id='dropdown'
                      className='z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700'
                    >
                      <ul className='py-2' aria-labelledby='dropdownButton'>
                        <li>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Export Data
                          </a>
                        </li>
                        <li>
                          <a
                            href='#'
                            className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex flex-col items-center pb-10'>
                    <div className='relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600'>
                      <svg
                        className='absolute -left-1 h-12 w-12 text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                    </div>

                    <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                      {`${item?.firstName} ${item?.secondName}`}
                    </h5>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      Средний разработчик
                    </span>

                    <div className='flex flex-wrap'>
                      {item?.hardSkills?.map(({ name, skillLevel }) => (
                        <span
                          key={name}
                          className='me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-base font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300'
                        >
                          {`${name} - ${skillLevel}`}
                        </span>
                      ))}

                      {item?.softSkills?.map(({ name, skillLevel }) => (
                        <span
                          key={name}
                          className='me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-base font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300'
                        >
                          {`${name} - ${skillLevel}`}
                        </span>
                      ))}
                    </div>
                    <div className='mt-4 flex md:mt-6'>
                      <button
                        onClick={() =>
                          setFormationResult((prevState) =>
                            prevState.filter(({ id }) => id !== item.id)
                          )
                        }
                        className='inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      >
                        Убрать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
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
