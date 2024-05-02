'use client';

import { ToastContainer } from 'react-toastify';
import { Header } from '@/components/Header';

export default function Home() {
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
