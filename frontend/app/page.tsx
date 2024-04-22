'use client';

import { Header } from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import { useUser } from '@/utils/hooks/useUser';

export default function Home() {
  // const user = useUser();
  return (
    <>
      <Header />
      <main className='container mx-auto'>
        <div className={'container mx-auto'}>
          <h2 className='text-3xl font-extrabold dark:text-white'>
            Payments tool for companies
          </h2>
        </div>
        <input placeholder={'click'} />
      </main>
      <ToastContainer />
    </>
  );
}
