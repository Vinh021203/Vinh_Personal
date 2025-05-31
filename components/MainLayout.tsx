'use client';

import { Header } from './Header';
import { Footer } from './Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { text } from '@/libs/text';
import { FaFacebookMessenger, FaPhoneAlt, FaRobot } from 'react-icons/fa';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';
import ChatbotBox from '@/components/ChatbotBox';
import toast from 'react-hot-toast';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { lang } = useLanguage();
  const t = text[lang];
  const { user } = useUser();
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-0">{children}</main>
      <Footer />

      {/* Chatbox nếu đã đăng nhập */}
      {showChat && user && (
        <ChatbotBox onClose={() => setShowChat(false)} />
      )}

      {/* Nút nổi – chỉ hiển thị khi chatbox đang tắt */}
      {!showChat && (
        <div className="fixed z-50 flex flex-col items-end gap-3 bottom-5 right-5">
          {/* Chatbot */}
          <button
            onClick={() => {
              if (!user) {
                toast.error('Vui lòng đăng nhập để sử dụng chatbot!');
                return;
              }
              setShowChat(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-white transition-all bg-purple-600 rounded-full shadow hover:bg-purple-700"
            aria-label="Chatbot"
          >
            <FaRobot className="w-5 h-5" />
            <span className="hidden text-sm font-medium md:inline">Chatbot</span>
          </button>

          {/* Messenger */}
          <a
            href="https://m.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-white bg-[#0084FF] rounded-full shadow hover:bg-[#006fde] transition-all"
            aria-label={t.messenger}
          >
            <FaFacebookMessenger className="w-5 h-5" />
            <span className="hidden text-sm font-medium md:inline">{t.messenger}</span>
          </a>

          {/* Call */}
          <a
            href="tel:+84912345678"
            className="flex items-center gap-2 px-4 py-2 text-white transition-all bg-green-600 rounded-full shadow hover:bg-green-700"
            aria-label={t.call}
          >
            <FaPhoneAlt className="w-4 h-4" />
            <span className="hidden text-sm font-medium md:inline">{t.call}</span>
          </a>
        </div>
      )}
    </>
  );
}
