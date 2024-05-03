import { useEffect, useState } from 'react';
import { E_ROLES, IUser } from '@/types/user';

export const useUser = () => {
  const [user, setUser] = useState<IUser | undefined>();
  const isAdmin = user?.roles.includes(E_ROLES.ROLE_ADMIN);
  const isEmployee = user?.roles.includes(E_ROLES.ROLE_EMPLOYEE);
  const isManager = user?.roles.includes(E_ROLES.ROLE_MANAGER);

  const getCurrentUser = () => {
    try {
      fetch(`app/users/current`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          if (response.status === 401) {
            setUser(undefined);
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        });
    } catch (e) {
      console.log(e);
      setUser(undefined);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { user, refetch: getCurrentUser, isManager, isAdmin, isEmployee };
};
