import { useEffect, useState } from 'react';
import { E_ROLES, IUser } from '@/types/user';
import axios from 'axios';
import { IEmployee } from '@/types/employees';

export const useUser = () => {
  const [user, setUser] = useState<IUser | undefined>();
  const [employee, setEmployee] = useState<IEmployee | undefined>();
  const isAdmin = user?.roles.includes(E_ROLES.ROLE_ADMIN);
  const isEmployee = user?.roles.includes(E_ROLES.ROLE_EMPLOYEE);
  const isManager = user?.roles.includes(E_ROLES.ROLE_MANAGER);

  const getCurrentUser = () => {
    try {
      axios
        .get(`app/users/current`)
        .then(({ data, status }) => {
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
      console.error(e);
      setUser(undefined);
    }
  };

  const getCurrentEmployee = async () => {
    try {
      const { data: currentEmployee } = await axios.get(
        'app/employees/current'
      );
      return setEmployee(currentEmployee);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getCurrentEmployee();
  }, []);

  return {
    user,
    refetch: getCurrentUser,
    refetchCurrentEmployee: getCurrentEmployee,
    currentEmployee: employee,
    isManager,
    isAdmin,
    isEmployee,
  };
};
