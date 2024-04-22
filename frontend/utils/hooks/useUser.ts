import { useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState();

  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/current`, {
    method: 'GET',
    credentials: 'include',
    mode: 'no-cors',
  }).then((response) => console.log('response', response));
};
