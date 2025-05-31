'use client';

import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';
import { Toaster } from 'react-hot-toast';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {isAdmin ? children : <MainLayout>{children}</MainLayout>}
      <Toaster position="top-center" />
    </>
  );
}
