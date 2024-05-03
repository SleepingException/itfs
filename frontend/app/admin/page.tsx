'use client';
import { Header } from '@/components/Header';
import { useUser } from '@/utils/hooks/useUser';
import { useEffect, useState } from 'react';
import { E_ROLES, IUser } from '@/types/user';
import { toast } from 'react-toastify';

const tagsByRole = {
  [E_ROLES.ROLE_ADMIN]: (
    <span className='me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300'>
      Админ
    </span>
  ),
  [E_ROLES.ROLE_MANAGER]: (
    <span className='me-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400'>
      Менеджер
    </span>
  ),
  [E_ROLES.ROLE_EMPLOYEE]: (
    <span className='me-2 rounded border border-gray-500 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-400'>
      Сотрудник
    </span>
  ),
};

const AdminPage = () => {
  const { isAdmin } = useUser();
  const [data, setData] = useState<IUser[]>();

  const getData = () => {
    fetch(`/app/admin/users`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getData();
  }, []);

  if (!isAdmin) {
    return null;
  }

  const onDeactivate = (id: number) => {
    fetch(`/app/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => toast.error('Пользователь деактивирован'))
      .then(getData);
  };

  const onActivate = (id: number) => {
    fetch(`/app/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => toast.success('Пользователь активирован'))
      .then(getData);
  };

  const onChangeUserRoles = (id: number, roles: E_ROLES[]) => {
    fetch(`/app/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ roles, enabled: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => toast.success('Роли пользователя успешно изменены'))
      .then(getData);
  };

  const list = data?.map(({ id, fullName, roles, enabled }) => {
    if (roles.includes(E_ROLES.ROLE_ADMIN)) return;
    return (
      <tr
        key={id}
        className='border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'
      >
        <th
          scope='row'
          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
        >
          {id}
        </th>
        <td className='px-6 py-4'>{fullName}</td>
        <td className='px-6 py-4'>
          <>
            {roles.map((role) => {
              return tagsByRole[role];
            })}
            {!roles.includes(E_ROLES.ROLE_MANAGER) ? (
              <button
                onClick={() =>
                  onChangeUserRoles(id, [...roles, E_ROLES.ROLE_MANAGER])
                }
                type='button'
                className='rounded-lg bg-green-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Добавить роль Менеджера
              </button>
            ) : (
              <button
                type='button'
                onClick={() =>
                  onChangeUserRoles(
                    id,
                    roles.filter((role) => role !== E_ROLES.ROLE_MANAGER)
                  )
                }
                className='rounded-lg bg-red-700 px-3 py-2 text-center text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Убрать роль Менеджера
              </button>
            )}
          </>
        </td>
        <td className='px-6 py-4 text-right'>
          {enabled ? (
            <button
              onClick={() => onDeactivate(id)}
              className='font-medium text-red-600 hover:underline dark:text-red-500'
            >
              Деактивировать
            </button>
          ) : (
            <button
              onClick={() => onActivate(id)}
              className='font-medium text-green-600 hover:underline dark:text-green-500'
            >
              Активировать
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />
      <div className='container relative mx-auto  overflow-x-auto pt-4 shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                №
              </th>
              <th scope='col' className='px-6 py-3'>
                Имя
              </th>
              <th scope='col' className='px-6 py-3'>
                Роли
              </th>
              <th scope='col' className='px-6 py-3' />
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
