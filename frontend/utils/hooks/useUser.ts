import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState();

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

  return { user, refetch: getCurrentUser };
};
