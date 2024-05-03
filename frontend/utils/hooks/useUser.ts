import { useEffect, useState } from 'react';
import { E_ROLES, IUser } from '@/types/user';
import axios from 'axios';

export const useUser = () => {
  const [user, setUser] = useState<IUser | undefined>();
  const isAdmin = user?.roles.includes(E_ROLES.ROLE_ADMIN);
  const isEmployee = user?.roles.includes(E_ROLES.ROLE_EMPLOYEE);
  const isManager = user?.roles.includes(E_ROLES.ROLE_MANAGER);

  const getCurrentUser = () => {
    try {
      axios
        .get(`app/users/current`)
        .then(({ data, status }) => {
          console.log('userData', data);
          if (typeof data === 'object' && status === 200) {
            return setUser(data);
          }

          return setUser(undefined);
        })
        .catch((error) => {
          setUser(undefined);
          console.error('There was a problem with the fetch operation:', error);
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
