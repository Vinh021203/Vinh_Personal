"use client";

import React, { useState, useEffect } from "react"; // Đã thêm import React
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        mobileOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
    { left: 25, top: 40 },
    { left: 85, top: 75 },
  ];

  return (
    <div className="relative flex flex-col h-screen overflow-hidden text-slate-900 md:flex-row bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute rounded-full w-96 h-96 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)",
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full w-80 h-80 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            right: `${mousePosition.x * 0.015}px`,
            bottom: `${mousePosition.y * 0.015}px`,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Tech Elements */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div className="w-1 h-1 rounded-full bg-purple-400/20" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Sidebar & Main Content Logic (Giữ nguyên phần logic layout của bạn) */}
      {/* ... Bạn hãy đảm bảo phần Sidebar và Header được render đúng vị trí ở đây ... */}

      {/* Ví dụ cấu trúc chuẩn: */}
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-purple-500/20 transition-all duration-300 ease-in-out md:static md:block backdrop-blur-xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full bg-white/50">
          <Sidebar onClose={() => setMobileOpen(false)} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="relative z-10 flex-1 overflow-y-auto">{children}</main>
      </div>

      <Toaster />
    </div>
  );
}
