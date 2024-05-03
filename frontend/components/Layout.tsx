import { Header } from '@/components/Header';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='container mx-auto'>{children}</main>
    </>
  );
};
