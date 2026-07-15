"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex h-[100dvh] max-w-full overflow-hidden bg-[#fff8e9] text-zinc-950">
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            aria-label="Đóng sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-zinc-950/70 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={() => setMobileOpen((value) => !value)} isMobileMenuOpen={mobileOpen} />
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            border: "1px solid #18181b",
            borderRadius: 0,
            boxShadow: "4px 4px 0 #ffb21c",
            fontWeight: 700,
          },
        }}
      />
    </div>
  );
}
