'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen text-white md:flex-row bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 p-4 border-r bg-black/80 backdrop-blur-md transition-transform duration-300 ease-in-out md:static md:block border-white/10 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* <Sidebar /> */}
        <Sidebar onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Mobile Header with toggle */}
      <div className="fixed top-0 left-0 z-50 block w-full border-b md:hidden bg-black/90 border-white/10">
        <Header onToggleSidebar={() => setMobileOpen((prev) => !prev)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden pt-14 md:pt-0">
        {/* Header desktop */}
        <div className="hidden md:block">
          <Header />
        </div>

        <main className="flex-1 px-4 py-6 overflow-y-auto md:px-6">
          <div className="mt-6">{children}</div>
        </main>

        <Toaster position="top-center" />
      </div>
    </div>
  );
}