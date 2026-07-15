"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
  RefreshCcw,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

type Sender = "user" | "bot";

interface Message {
  id: string;
  sender: Sender;
  content: string;
  options?: string[];
  timestamp: Date;
}

const scripts: Record<string, { text: string; options?: string[] }> = {
  start: {
    text: "Chào bạn! Mình là trợ lý VinhWorks. Bạn muốn trao đổi nhanh về hạng mục nào?",
    options: ["Báo giá website", "Tư vấn landing page", "Tối ưu SEO", "Gặp Lương Vinh"],
  },
  "Báo giá website": {
    text: "Website thường phụ thuộc phạm vi: landing page, website doanh nghiệp, CMS hay web app. Bạn có thể gửi mục tiêu, số trang dự kiến và deadline để mình gợi ý hướng phù hợp.",
    options: ["Tôi cần website doanh nghiệp", "Tôi cần web có quản trị", "Liên hệ tư vấn ngay"],
  },
  "Tư vấn landing page": {
    text: "Landing page phù hợp khi bạn cần chạy chiến dịch, giới thiệu dịch vụ hoặc thu lead. Mình sẽ ưu tiên tốc độ tải, CTA rõ và bố cục chuyển đổi tốt.",
    options: ["Xem dự án mẫu", "Nhận tư vấn", "Quay lại"],
  },
  "Tối ưu SEO": {
    text: "Có thể tối ưu metadata, heading, schema, sitemap, tốc độ tải và cấu trúc nội dung. Nếu bạn có website hiện tại, gửi link để mình check nhanh.",
    options: ["Gửi link website", "Tối ưu tốc độ", "Quay lại"],
  },
  "Gặp Lương Vinh": {
    text: "Ok, cách nhanh nhất là gọi trực tiếp hoặc gửi thông tin dự án qua trang liên hệ. Bạn muốn đi theo hướng nào?",
    options: ["Gọi ngay", "Mở trang liên hệ", "Quay lại"],
  },
  "Tôi cần website doanh nghiệp": {
    text: "Rất hợp. Website doanh nghiệp nên có: trang giới thiệu, dịch vụ, dự án/case study, liên hệ và nền tảng SEO cơ bản. Mình có thể tư vấn phạm vi gọn để tiết kiệm chi phí.",
    options: ["Mở trang liên hệ", "Gọi ngay"],
  },
  "Tôi cần web có quản trị": {
    text: "Với CMS, mình sẽ thiết kế cả giao diện khách xem và dashboard quản trị để bạn tự cập nhật nội dung/dự án/dịch vụ.",
    options: ["Mở trang liên hệ", "Gọi ngay"],
  },
  "Xem dự án mẫu": {
    text: "Bạn có thể xem các dự án thật ở trang Dự án. Mình sẽ mở đúng danh sách portfolio để bạn tham khảo.",
    options: ["Mở trang dự án", "Quay lại"],
  },
  "Nhận tư vấn": {
    text: "Bạn để lại mục tiêu, ngân sách dự kiến và thời gian mong muốn nhé. Mình sẽ phản hồi theo hướng rõ ràng, thực tế.",
    options: ["Mở trang liên hệ", "Gọi ngay"],
  },
  "Liên hệ tư vấn ngay": {
    text: "Tuyệt. Bạn có thể gọi trực tiếp hoặc điền form để mình nắm đủ thông tin trước khi trao đổi.",
    options: ["Gọi ngay", "Mở trang liên hệ"],
  },
  "Gửi link website": {
    text: "Bạn dán link website vào ô chat này nhé. Mình sẽ ghi nhận và gợi ý các đầu việc cần kiểm tra: tốc độ, SEO, giao diện mobile và cấu trúc nội dung.",
    options: ["Mở trang liên hệ", "Quay lại"],
  },
  "Tối ưu tốc độ": {
    text: "Các điểm thường tối ưu gồm ảnh, font, JS bundle, cache/ISR, lazy loading và giảm request không cần thiết. Với Next.js có thể làm khá tốt.",
    options: ["Mở trang liên hệ", "Quay lại"],
  },
  "Quay lại": {
    text: "Bạn muốn mình hỗ trợ phần nào tiếp?",
    options: ["Báo giá website", "Tư vấn landing page", "Tối ưu SEO", "Gặp Lương Vinh"],
  },
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatbotBox({ onClose }: { onClose: () => void }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const guestIdRef = useRef<string>("");

  const addMessage = (sender: Sender, content: string, options?: string[]) => {
    setMessages((items) => [
      ...items,
      { id: makeId(), sender, content, options, timestamp: new Date() },
    ]);
  };

  const reset = () => {
    setMessages([]);
    const welcome = scripts.start;
    const name = user?.name ? ` ${user.name}` : "";
    setTimeout(() => addMessage("bot", `Chào${name}! ${welcome.text}`, welcome.options), 0);
  };

  useEffect(() => {
    const storedGuestId = window.localStorage.getItem("vinhworks_guest_id");
    const nextGuestId = storedGuestId || `guest-${crypto.randomUUID()}`;
    window.localStorage.setItem("vinhworks_guest_id", nextGuestId);
    guestIdRef.current = nextGuestId;

    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const handleAction = (value: string) => {
    if (value === "Gọi ngay") {
      window.location.href = "tel:0971386588";
      return;
    }
    if (value === "Mở trang liên hệ") {
      window.location.href = "/contact";
      return;
    }
    if (value === "Mở trang dự án") {
      window.location.href = "/projects";
      return;
    }
    send(value);
  };

  const syncCustomerMessage = async (content: string) => {
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          guestId: guestIdRef.current,
          senderName: user?.name || "Khách truy cập",
          receiverId: null,
          isAdmin: false,
        }),
      });
    } catch (error) {
      console.error("Không thể đồng bộ tin nhắn chatbot:", error);
    }
  };

  const send = (value = input) => {
    const text = value.trim();
    if (!text || typing) return;

    addMessage("user", text);
    syncCustomerMessage(text);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const script = scripts[text] || {
        text: "Mình đã ghi nhận ý của bạn. Nếu cần phản hồi chính xác hơn, bạn gửi thêm link website, mục tiêu dự án hoặc thời gian mong muốn nhé.",
        options: ["Mở trang liên hệ", "Gọi ngay", "Quay lại"],
      };
      addMessage("bot", script.text, script.options);
      setTyping(false);
    }, 650);
  };

  return (
    <section className="flex h-full flex-col overflow-hidden border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]">
      <header className="relative border-b border-zinc-950 bg-zinc-950 p-5 text-white">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-[linear-gradient(135deg,transparent_35%,rgba(255,178,28,.18)_35%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center border border-[#ffb21c] bg-[#ffb21c] text-zinc-950 shadow-[3px_3px_0_#fff]">
              <Bot size={22} />
            </span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#ffb21c]">
                VinhWorks Assistant
              </p>
              <h2 className="mt-1 text-xl font-black leading-none">AI Chatbot</h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Sẵn sàng tư vấn nhanh
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reset}
              className="grid h-10 w-10 place-items-center border border-white/20 bg-white/5 text-white transition hover:bg-[#ffb21c] hover:text-zinc-950"
              aria-label="Làm mới hội thoại"
            >
              <RefreshCcw size={17} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center border border-white/20 bg-white/5 text-white transition hover:bg-white hover:text-zinc-950"
              aria-label="Đóng chatbot"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 border-b border-zinc-950 bg-[#fff8e9] text-center text-[9px] font-black uppercase tracking-[0.12em]">
        <span className="flex items-center justify-center gap-1 border-r border-zinc-950 px-2 py-3">
          <Sparkles size={13} className="text-[#d98200]" /> Tư vấn
        </span>
        <span className="flex items-center justify-center gap-1 border-r border-zinc-950 px-2 py-3">
          <Headphones size={13} className="text-[#d98200]" /> Hỗ trợ
        </span>
        <span className="flex items-center justify-center gap-1 px-2 py-3">
          <Phone size={13} className="text-[#d98200]" /> Liên hệ
        </span>
      </div>

      <div ref={scrollRef} className="custom-scrollbar flex-1 space-y-4 overflow-y-auto bg-[#fff8e9] p-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[88%] ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`flex items-end gap-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center border border-zinc-950 ${message.sender === "user" ? "bg-[#ffb21c]" : "bg-white"}`}>
                    {message.sender === "user" ? <UserRound size={15} /> : <Bot size={15} />}
                  </span>
                  <p className={`whitespace-pre-line border border-zinc-950 px-4 py-3 text-sm font-semibold leading-6 shadow-[3px_3px_0_rgba(24,24,27,.12)] ${message.sender === "user" ? "bg-[#ffb21c] text-zinc-950" : "bg-white text-slate-700"}`}>
                    {message.content}
                  </p>
                </div>
                {message.options?.length ? (
                  <div className={`mt-3 flex flex-wrap gap-2 ${message.sender === "user" ? "justify-end" : "justify-start pl-10"}`}>
                    {message.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAction(option)}
                        className="inline-flex items-center gap-2 border border-zinc-950 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.08em] text-zinc-950 transition hover:-translate-y-0.5 hover:bg-[#ffb21c] hover:shadow-[3px_3px_0_#111]"
                      >
                        {option}
                        <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                ) : null}
                <span className="mt-1.5 block text-[10px] font-bold text-zinc-400">
                  {message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing ? (
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center border border-zinc-950 bg-white">
              <Bot size={15} />
            </span>
            <span className="flex gap-1 border border-zinc-950 bg-white px-4 py-3">
              <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-.2s]" />
              <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-.1s]" />
              <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
            </span>
          </div>
        ) : null}
      </div>

      <footer className="border-t border-zinc-950 bg-white p-3">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <a href="tel:0971386588" className="flex items-center justify-center gap-2 border border-zinc-950 bg-zinc-950 px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
            <Phone size={14} className="text-[#ffb21c]" /> Gọi nhanh
          </a>
          <a href="/contact" className="flex items-center justify-center gap-2 border border-zinc-950 bg-[#ffb21c] px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-zinc-950">
            <Mail size={14} /> Gửi form
          </a>
        </div>
        <div className="flex items-end gap-2 border border-zinc-950 bg-[#fff8e9] p-2">
          <MessageSquare size={18} className="mb-2 shrink-0 text-zinc-500" />
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Nhập nhu cầu của bạn..."
            className="custom-scrollbar max-h-24 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm font-semibold leading-6 text-zinc-800 outline-none placeholder:text-zinc-400"
          />
          <button
            type="button"
            onClick={() => send()}
            disabled={!input.trim() || typing}
            className="grid h-10 w-10 shrink-0 place-items-center border border-zinc-950 bg-[#ffb21c] text-zinc-950 transition hover:bg-zinc-950 hover:text-white disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
            aria-label="Gửi tin nhắn"
          >
            <Send size={17} />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] font-bold text-zinc-400">
          AI gợi ý nhanh — dự án thật sẽ được Lương Vinh tư vấn lại chi tiết.
        </p>
      </footer>
    </section>
  );
}
