"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, MessageCircle, Phone, Sparkles, X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const ChatbotBox = dynamic(() => import("@/components/ChatbotBox"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center border border-zinc-900 bg-white text-[10px] font-black uppercase tracking-[.18em] text-zinc-500 shadow-[5px_5px_0_#ffb21c]">
      Đang mở chatbot
    </div>
  ),
});

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [showChat, setShowChat] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(74);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const header = document.querySelector("header");
      if (header) setHeaderHeight(header.offsetHeight);
      setShowScrollTop(window.scrollY > 420);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const openChatbot = () => {
    setShowChat(true);
    setMenuOpen(false);
  };

  const actions = [
    { id: "chatbot", icon: Bot, label: "AI Chatbot", onClick: openChatbot, accent: "bg-[#ffb21c] text-zinc-950" },
    { id: "messenger", icon: MessageCircle, label: "Messenger", href: "https://m.me/yourusername", accent: "bg-white text-zinc-950" },
    { id: "phone", icon: Phone, label: "Gọi ngay", href: "tel:0971386588", accent: "bg-zinc-950 text-white" },
  ];

  return (
    <>
      <Header />
      <main style={{ paddingTop: headerHeight }} className="relative min-h-screen">
        {children}
      </main>
      <Footer />

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-5 right-4 z-[70] h-[min(680px,calc(100dvh-40px))] w-[calc(100vw-32px)] max-w-[420px] sm:bottom-6 sm:right-6"
          >
            <ChatbotBox onClose={() => setShowChat(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showChat && (
        <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:right-6">
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                className="flex flex-col items-end gap-2.5"
              >
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  const content = (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: -4 }}
                      className={`group flex min-w-[190px] items-center border border-zinc-900 p-1.5 pr-5 shadow-[4px_4px_0_rgba(24,24,27,.2)] ${action.accent}`}
                    >
                      <span className={`mr-4 grid h-11 w-11 place-items-center border border-zinc-900 ${action.id === "phone" ? "bg-[#ffb21c] text-zinc-950" : "bg-white text-zinc-950"}`}>
                        <Icon size={19} />
                      </span>
                      <span className="text-sm font-black">{action.label}</span>
                    </motion.div>
                  );

                  return action.href ? (
                    <a key={action.id} href={action.href} target={action.id === "messenger" ? "_blank" : undefined} rel={action.id === "messenger" ? "noopener noreferrer" : undefined}>
                      {content}
                    </a>
                  ) : (
                    <button key={action.id} type="button" onClick={action.onClick}>
                      {content}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`relative grid h-16 w-16 place-items-center rounded-full border-2 border-zinc-900 shadow-[4px_4px_0_#18181b] transition-colors ${menuOpen ? "bg-zinc-950 text-white" : "bg-[#ffb21c] text-zinc-950"}`}
            aria-label={menuOpen ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
            aria-expanded={menuOpen}
          >
            <span className="absolute -inset-2 -z-10 rounded-full border border-[#ffb21c] bg-amber-100/70" />
            <motion.span animate={{ rotate: menuOpen ? 90 : 0 }}>
              {menuOpen ? <X size={25} /> : <Sparkles size={25} />}
            </motion.span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {showScrollTop && !showChat && (
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group fixed bottom-6 left-5 z-40 grid h-[52px] w-[52px] place-items-center rounded-full border-2 border-zinc-900 bg-[#ffb21c] text-zinc-950 shadow-[0_10px_24px_rgba(24,24,27,.2)] sm:left-6"
            aria-label="Lên đầu trang"
          >
            <ArrowUp size={20} />
            <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap border border-zinc-900 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wide text-zinc-950 opacity-0 shadow-[2px_2px_0_#ffb21c] transition-opacity group-hover:opacity-100 sm:block">
              Lên đầu trang
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
