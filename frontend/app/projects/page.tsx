'use client';

import { Layout } from '@/components/Layout';
import { useUser } from '@/utils/hooks/useUser';

const data = [
  {
    id: 0,
    name: 'string',
    description: 'string',
    author: {
      id: 0,
      firstName: 'string',
      secondName: 'string',
      lastName: 'string',
      position: 'string',
      salary: 0,
      phone: 'string',
      hardSkills: [
        {
          name: 'string',
          description: 'string',
          type: 'HARD',
          skillLevel: 'string',
        },
      ],
      softSkills: [
        {
          name: 'string',
          description: 'string',
          type: 'HARD',
          skillLevel: 'string',
        },
      ],
    },
    team: [
      {
        id: 0,
        firstName: 'string',
        secondName: 'string',
        lastName: 'string',
        position: 'string',
        salary: 0,
        phone: 'string',
        hardSkills: [
          {
            name: 'string',
            description: 'string',
            type: 'HARD',
            skillLevel: 'string',
          },
        ],
        softSkills: [
          {
            name: 'string',
            description: 'string',
            type: 'HARD',
            skillLevel: 'string',
          },
        ],
      },
    ],
    hardSkills: [
      {
        name: 'string',
        description: 'string',
        type: 'HARD',
        skillLevel: 0,
      },
    ],
    softSkills: [
      {
        name: 'string',
        description: 'string',
        type: 'HARD',
        skillLevel: 0,
      },
    ],
    deadline: '2024-05-05',
  },
];

const ProjectsPage = () => {
  const { isEmployee } = useUser();

  return (
    <Layout>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='mt-4 text-4xl font-extrabold dark:text-white'>
            Проекты
          </h2>
          <p className='my-4 text-lg text-gray-500'>
            Здесь будут указаны проекты вы принимаете участие
            {isEmployee ? '.' : 'или вы можете создать новый.'}
          </p>
        </div>
        <button className='rounded-full bg-white p-3'>
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
      </div>
      {!data.length ? (
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
              {data?.map(({ id, name, description, deadline }) => (
                <tr key={id} className='bg-white dark:bg-gray-800'>
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
  );
};

export default ProjectsPage;
