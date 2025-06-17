"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { text } from "@/libs/text";
import { FaFacebookMessenger, FaPhoneAlt, FaRobot } from "react-icons/fa";
import { useUser } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import ChatbotBox from "@/components/ChatbotBox";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Bot,
  X,
  Sparkles,
  Zap,
  ChevronUp,
  ArrowUp,
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { lang } = useLanguage();
  const t = text[lang];
  const { user } = useUser();
  const [showChat, setShowChat] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  // Calculate header height dynamically
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);
    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChatbotClick = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để sử dụng chatbot!", {
        style: {
          background: "rgba(15, 23, 42, 0.95)",
          color: "#fff",
          border: "1px solid rgba(147, 51, 234, 0.3)",
          backdropFilter: "blur(20px)",
          borderRadius: "12px",
        },
      });
      return;
    }
    setShowChat(true);
    setIsFloatingMenuOpen(false);
  };

  const floatingButtons = [
    {
      id: "chatbot",
      icon: Bot,
      label: "AI Chatbot",
      onClick: handleChatbotClick,
      className:
        "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600",
      iconColor: "text-white",
    },
    {
      id: "messenger",
      icon: MessageCircle,
      label: "Messenger",
      href: "https://m.me/yourusername",
      className:
        "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
      iconColor: "text-white",
    },
    {
      id: "phone",
      icon: Phone,
      label: "Gọi ngay",
      href: "tel:0971386588",
      className:
        "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
      iconColor: "text-white",
    },
  ];

  return (
    <>
      <Header />
      <main
        style={{ paddingTop: `${headerHeight}px` }}
        className="relative min-h-screen"
      >
        {children}
      </main>
      <Footer />

      {/* Enhanced Chatbox */}
      <AnimatePresence>
        {showChat && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChatbotBox onClose={() => setShowChat(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Action Buttons */}
      {!showChat && (
        <div className="fixed z-50 bottom-6 right-6">
          {/* Main Menu Button */}
          <motion.button
            onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center mb-4 text-white transition-all duration-300 rounded-full shadow-2xl w-14 h-14 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:shadow-purple-500/25"
            aria-label="Menu liên hệ"
          >
            <motion.div
              animate={{ rotate: isFloatingMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isFloatingMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </motion.div>

            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-ping opacity-20"></div>
          </motion.button>

          {/* Floating Menu Items */}
          <AnimatePresence>
            {isFloatingMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {floatingButtons.map((button, index) => {
                  const IconComponent = button.icon;

                  const ButtonContent = (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/10 ${button.className}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${button.iconColor}`}
                      />
                      <span className="text-sm font-medium text-white whitespace-nowrap">
                        {button.label}
                      </span>

                      {/* Glow effect */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 group-hover:opacity-100"></div>
                    </motion.div>
                  );

                  return button.href ? (
                    <a
                      key={button.id}
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block"
                    >
                      {ButtonContent}
                    </a>
                  ) : (
                    <button
                      key={button.id}
                      onClick={button.onClick}
                      className="relative block w-full"
                    >
                      {ButtonContent}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && !showChat && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed z-40 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 border rounded-full shadow-2xl bottom-6 left-6 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 backdrop-blur-sm border-white/10"
            aria-label="Lên đầu trang"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Container Styling */}
      <style jsx global>{`
        .react-hot-toast {
          z-index: 9999;
        }
      `}</style>
    </>
  );
}
