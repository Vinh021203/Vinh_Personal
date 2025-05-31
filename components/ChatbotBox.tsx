'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { set } from 'mongoose';

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export default function ChatbotBox({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const text = await res.text(); // tránh lỗi JSON parse nếu server trả về rỗng
      if (!res.ok) {
        console.error('Lỗi response:', text);
        return;
      }
      const data = JSON.parse(text);
      setMessages(data);
    } catch (err) {
      console.error('Lỗi khi gọi API messages:', err);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
    const newMsg = await res.json();
    setMessages((prev) => [...prev, newMsg]);
    setMessage('');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="fixed right-6 bottom-36 w-[340px] max-h-[500px] sm:w-96 rounded-2xl shadow-2xl border border-gray-200 bg-white flex flex-col overflow-hidden z-[60]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 text-white bg-teal-600">
        <div className="flex items-center gap-2 font-semibold">
          <MessageCircle size={18} />
          Hỗ trợ khách hàng
        </div>
        <button onClick={onClose} className="transition-colors hover:text-red-200">
          <X size={20} />
        </button>
      </div>

      {/* Tin nhắn */}
      <div
        ref={scrollRef}
        className="flex-1 h-[320px] overflow-y-auto bg-gray-50 text-sm p-3 space-y-2 scroll-smooth"
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Chưa có tin nhắn nào.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="flex flex-col items-end">
              <div className="bg-teal-100 text-gray-800 px-3 py-2 rounded-xl max-w-[75%] ml-auto shadow">
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Nhập tin nhắn */}
      <div className="px-3 py-2 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhắn gì đó..."
            className="flex-1 px-3 py-2 text-sm bg-gray-100 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSend}
            className="p-2 text-white transition bg-teal-500 rounded-lg hover:bg-teal-600"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
