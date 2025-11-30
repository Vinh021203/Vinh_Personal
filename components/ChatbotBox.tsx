"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Zap,
  Headphones,
  ChevronRight,
  RefreshCcw,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";

// --- TYPES ---
interface Message {
  id: string;
  sender: "user" | "bot" | "agent";
  content: string;
  type: "text" | "options" | "typing";
  options?: string[];
  timestamp: Date;
}

interface ChatScript {
  [key: string]: {
    text: string;
    options?: string[];
    action?: "SWITCH_TO_AGENT";
  };
}

// --- SCRIPT DATA ---
const CHAT_SCRIPTS: ChatScript = {
  start: {
    text: "Chào bạn! 👋 VinhWorks AI có thể giúp gì cho bạn hôm nay?",
    options: [
      "💰 Báo giá dịch vụ",
      "🛠️ Hỗ trợ kỹ thuật",
      "🎧 Gặp nhân viên tư vấn",
    ],
  },
  "💰 Báo giá dịch vụ": {
    text: "Dạ, bạn quan tâm đến mảng dịch vụ nào ạ?",
    options: ["Thiết kế Website", "Mobile App", "Marketing Online", "Quay lại"],
  },
  "Thiết kế Website": {
    text: "Gói thiết kế Website trọn gói bắt đầu từ 5.000.000đ. Bao gồm: \n- Giao diện độc quyền \n- Tối ưu SEO \n- Bảo hành 12 tháng.",
    options: ["Xem mẫu giao diện", "Liên hệ tư vấn ngay", "Quay lại"],
  },
  "🛠️ Hỗ trợ kỹ thuật": {
    text: "Để hỗ trợ tốt nhất, vui lòng cho biết vấn đề bạn đang gặp phải:",
    options: ["Lỗi truy cập", "Quên mật khẩu", "Cấu hình Email", "Khác"],
  },
  "🎧 Gặp nhân viên tư vấn": {
    text: "Hệ thống đang kết nối đến nhân viên CSKH... Vui lòng chờ trong giây lát. ⏳",
    action: "SWITCH_TO_AGENT",
  },
  "Quay lại": {
    text: "Bạn cần hỗ trợ thêm thông tin gì khác không ạ?",
    options: [
      "💰 Báo giá dịch vụ",
      "🛠️ Hỗ trợ kỹ thuật",
      "🎧 Gặp nhân viên tư vấn",
    ],
  },
  default: {
    text: "Xin lỗi, tôi là AI và chưa hiểu rõ ý bạn. Vui lòng chọn các mục hỗ trợ bên dưới hoặc chọn 'Gặp nhân viên tư vấn'.",
    options: ["💰 Báo giá dịch vụ", "🎧 Gặp nhân viên tư vấn"],
  },
};

export default function ChatbotBox({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveChat, setIsLiveChat] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addMessage = (
    sender: Message["sender"],
    content: string,
    options?: string[]
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      content,
      type: options ? "options" : "text",
      options,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    addMessage("user", text);
    setInputValue("");
    setIsTyping(true);

    // Simulate Bot/Agent Response
    setTimeout(() => {
      if (isLiveChat) {
        const agentName = "Minh (CSKH)";
        addMessage(
          "agent",
          `Chào ${
            user?.name || "bạn"
          }, mình là ${agentName}. Mình đã nhận được tin: "${text}". Bạn chờ xíu nhé!`
        );
      } else {
        const script = CHAT_SCRIPTS[text] || CHAT_SCRIPTS["default"];
        if (script.action === "SWITCH_TO_AGENT") {
          setIsLiveChat(true);
          setTimeout(() => {
            addMessage(
              "bot",
              "✅ Đã kết nối với nhân viên hỗ trợ: Minh (CSKH)"
            );
          }, 1500);
        }
        addMessage("bot", script.text, script.options);
      }
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleReset = () => {
    setMessages([]);
    setIsLiveChat(false);
    const welcome = CHAT_SCRIPTS["start"];
    const welcomeText = `Chào ${
      user?.name || "bạn"
    }! 👋 VinhWorks AI có thể giúp gì cho bạn hôm nay?`;
    addMessage("bot", welcomeText, welcome.options);
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans bg-white border shadow-2xl rounded-3xl border-slate-100">
      {/* --- HEADER --- */}
      <div
        className={`relative px-6 py-5 flex-shrink-0 transition-colors duration-500 ${
          isLiveChat
            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
            : "bg-gradient-to-r from-orange-500 to-amber-500"
        }`}
      >
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center justify-center border shadow-inner w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border-white/30">
                {isLiveChat ? (
                  <Headphones className="text-white" size={20} />
                ) : (
                  <Bot className="text-white" size={20} />
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight text-white">
                {isLiveChat ? "Hỗ trợ trực tuyến" : "VinhWorks AI"}
              </h3>
              <p className="flex items-center gap-1 text-xs text-white/90">
                {isLiveChat ? "Đang chat với nhân viên" : "Tự động trả lời"}{" "}
                <Sparkles size={10} />
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleReset}
              className="p-2 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/20"
              title="Làm mới"
            >
              <RefreshCcw size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- MESSAGES --- */}
      <div
        ref={scrollRef}
        className="flex-1 p-5 space-y-5 overflow-y-auto bg-slate-50 scroll-smooth custom-scrollbar"
      >
        <div className="text-center">
          <span className="text-[10px] font-medium text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">
            Hôm nay
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex items-end gap-2 max-w-[85%] ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                {msg.sender !== "user" && (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                      msg.sender === "agent"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {msg.sender === "agent" ? (
                      <Headphones size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`relative px-4 py-3 text-sm shadow-sm leading-relaxed whitespace-pre-line ${
                    msg.sender !== "user"
                      ? "bg-white text-slate-700 rounded-2xl rounded-bl-none border border-slate-100"
                      : "bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl rounded-br-none shadow-orange-500/20"
                  }`}
                >
                  {msg.content}
                </div>
              </div>

              {/* Options */}
              {msg.options && (
                <div className="flex flex-wrap gap-2 mt-3 ml-10">
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(opt)}
                      className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 text-xs font-bold rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all shadow-sm flex items-center gap-1 active:scale-95"
                    >
                      {opt} <ChevronRight size={12} />
                    </button>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <span
                className={`text-[10px] text-slate-400 mt-1.5 ${
                  msg.sender !== "user" ? "ml-11" : "mr-1"
                }`}
              >
                {msg.timestamp.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 ml-1"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200">
              {isLiveChat ? (
                <Headphones size={16} className="text-slate-500" />
              ) : (
                <Bot size={16} className="text-slate-500" />
              )}
            </div>
            <div className="flex gap-1 px-4 py-3 bg-white border rounded-bl-none border-slate-200 rounded-2xl">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* --- INPUT --- */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-slate-100">
        <div className="flex items-end gap-2 bg-slate-50 p-1.5 rounded-[24px] border border-slate-200 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <Phone size={20} />
          </button>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              isLiveChat ? "Nhập tin nhắn..." : "Chọn hoặc nhập yêu cầu..."
            }
            rows={1}
            disabled={isTyping}
            className="flex-1 w-full px-2 py-3 text-sm bg-transparent border-none outline-none resize-none text-slate-700 focus:ring-0 placeholder:text-slate-400 max-h-24 custom-scrollbar"
            style={{ minHeight: "44px" }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg flex-shrink-0 ${
              inputValue.trim() && !isTyping
                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-orange-500/30 text-white transform hover:scale-105"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isTyping ? (
              <Zap size={18} className="animate-spin" />
            ) : (
              <Send size={18} className="ml-0.5" />
            )}
          </button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-1">
            Powered by{" "}
            <span className="font-bold text-slate-500">
              VinhWorks Enterprise
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
