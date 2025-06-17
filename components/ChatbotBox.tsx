"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle, Bot, User, Sparkles, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isBot?: boolean;
}

export default function ChatbotBox({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    const userMessage = {
      _id: Date.now().toString(),
      senderId: user?.id || user?._id || "user",
      senderName: user?.name || "Bạn",
      content: currentMessage,
      createdAt: new Date().toISOString(),
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          _id: (Date.now() + 1).toString(),
          senderId: "bot",
          senderName: "VinhWorks AI",
          content: `Cảm ơn bạn đã liên hệ! Tôi đã nhận được tin nhắn: "${currentMessage}". Chúng tôi sẽ phản hồi sớm nhất có thể.`,
          createdAt: new Date().toISOString(),
          isBot: true,
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Không thể gửi tin nhắn!");
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Fix: Chỉ set welcome message, không gọi API
  useEffect(() => {
    const welcomeMessage = {
      _id: "welcome",
      senderId: "bot",
      senderName: "VinhWorks AI",
      content: `Xin chào ${
        user?.name || "bạn"
      }! 👋 Tôi là AI Assistant của VinhWorks. Tôi có thể giúp bạn về dịch vụ thiết kế website, lập trình và tư vấn công nghệ. Bạn cần hỗ trợ gì?`,
      createdAt: new Date().toISOString(),
      isBot: true,
    };

    setMessages([welcomeMessage]);
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-6 bottom-36 w-[360px] h-[520px] sm:w-96 rounded-3xl shadow-2xl border border-purple-500/20 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl flex flex-col overflow-hidden z-[60]"
    >
      {/* Header - Fix: Thêm event.stopPropagation() */}
      <div className="relative flex-shrink-0 px-6 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute flex items-center justify-center w-4 h-4 bg-green-400 border-2 border-white rounded-full -bottom-1 -right-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white">VinhWorks AI</h3>
              <p className="text-xs text-white/80">Hỗ trợ 24/7</p>
            </div>
          </div>

          {/* Fix: Thêm event handling */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Close button clicked");
              onClose();
            }}
            className="z-10 p-2 transition-all duration-200 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            type="button"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area - Fix: Chiều cao cố định */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-slate-800/50 to-slate-900/50 custom-scrollbar"
        style={{ height: "300px" }}
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[85%] ${
                  msg.isBot ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  }`}
                >
                  {msg.isBot ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`relative px-4 py-3 rounded-2xl shadow-lg ${
                    msg.isBot
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.isBot ? "text-gray-400" : "text-white/70"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 border bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t bg-slate-800/50 border-purple-500/20">
        <div className="flex items-end gap-3">
          <div className="relative flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn của bạn..."
              rows={1}
              className="w-full px-4 py-3 pr-12 text-sm text-white placeholder-gray-400 transition-all duration-300 border resize-none bg-slate-700/50 border-purple-500/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50 backdrop-blur-sm"
              style={{ minHeight: "44px", maxHeight: "88px" }}
            />
            <div className="absolute text-xs text-gray-500 bottom-1 right-3">
              {message.length}/500
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              message.trim() && !isLoading
                ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <Zap size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          {["Báo giá website", "Tư vấn SEO", "Hỗ trợ kỹ thuật"].map(
            (action) => (
              <button
                key={action}
                onClick={() => setMessage(action)}
                className="px-3 py-1 text-xs text-purple-300 transition-all duration-200 border rounded-full bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30"
              >
                {action}
              </button>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-2 text-center">
        <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <Sparkles className="w-3 h-3" />
          Powered by VinhWorks AI
        </p>
      </div>
    </motion.div>
  );
}
