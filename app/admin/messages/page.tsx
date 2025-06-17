"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle, Send, User } from "lucide-react";

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  receiverId?: string;
  content: string;
  createdAt: string;
  isAdmin?: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [mobileUserPanel, setMobileUserPanel] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        const adminMsg = data.find((msg: Message) => msg.isAdmin);
        if (adminMsg) setAdminId(adminMsg.senderId);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải tin nhắn:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  useEffect(() => {
    if (audioRef.current && messages.length > 0) {
      audioRef.current.play().catch(() => {});
    }
  }, [messages]);

  const uniqueUsers = Array.from(
    new Map(
      messages
        .filter((msg) => msg.senderId !== adminId)
        .map((msg) => [msg.senderId, msg.senderName])
    )
  );

  const filteredMessages = selectedUser
    ? messages.filter(
        (m) =>
          (m.senderId === selectedUser &&
            (!m.receiverId || m.receiverId === adminId)) ||
          (m.senderId === adminId && m.receiverId === selectedUser)
      )
    : [];

  const handleReply = async () => {
    if (!reply.trim() || !selectedUser) return;
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: reply,
          receiverId: selectedUser,
          isAdmin: true,
        }),
      });
      const newMsg = await res.json();
      setMessages((prev) => [...prev, newMsg]);
      setReply("");
    } catch (err) {
      console.error("Gửi phản hồi thất bại:", err);
    }
  };

  return (
    <section className="relative flex h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 to-black text-white">
      <audio ref={audioRef} src="/ping.mp3" preload="auto" />

      {/* Sidebar desktop */}
      <aside className="hidden p-4 overflow-y-auto border-r md:block w-72 border-white/10 bg-black/40">
        <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-teal-400">
          <MessageCircle size={18} /> Người dùng
        </h2>
        {uniqueUsers.length === 0 ? (
          <p className="text-gray-400">Không có người dùng.</p>
        ) : (
          <ul className="space-y-2">
            {uniqueUsers.map(([id, name]) => (
              <li
                key={id as string}
                className={`cursor-pointer px-4 py-2 rounded-lg transition font-medium text-sm ${
                  selectedUser === id
                    ? "bg-teal-600 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
                onClick={() => setSelectedUser(id as string)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Mobile user toggle */}
      <div className="absolute z-20 top-2 left-4 md:hidden">
        <button
          onClick={() => setMobileUserPanel(!mobileUserPanel)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-teal-300 rounded-full bg-white/10 hover:bg-white/20"
        >
          <User size={16} />{" "}
          {selectedUser ? "Đổi người dùng" : "Chọn người dùng"}
        </button>
      </div>

      {/* Mobile user panel */}
      {mobileUserPanel && (
        <div className="absolute z-30 p-4 bg-gray-800 border rounded-lg shadow-lg border-white/10 top-12 left-4 right-4 md:hidden">
          <ul className="space-y-2">
            {uniqueUsers.map(([id, name]) => (
              <li
                key={id as string}
                className={`cursor-pointer px-4 py-2 rounded-lg transition font-medium text-sm ${
                  selectedUser === id
                    ? "bg-teal-600 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
                onClick={() => {
                  setSelectedUser(id as string);
                  setMobileUserPanel(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat content */}
      <div className="flex flex-col flex-1 p-4 overflow-hidden pt-14 md:pt-4 sm:p-6">
        <h2 className="mb-6 text-lg font-bold text-teal-400">
          {selectedUser
            ? `Tin nhắn với: ${
                uniqueUsers.find((u) => u[0] === selectedUser)?.[1]
              }`
            : "Chọn người dùng để xem tin nhắn"}
        </h2>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto border shadow-inner bg-gradient-to-br from-gray-800 to-gray-900 border-white/10 rounded-xl custom-scroll">
          {loading ? (
            <p className="text-gray-400">Đang tải...</p>
          ) : filteredMessages.length === 0 ? (
            <p className="text-gray-400">Chưa có tin nhắn nào.</p>
          ) : (
            filteredMessages.map((msg) => {
              const isFromAdmin = msg.senderId === adminId;
              return (
                <div
                  key={msg._id}
                  className={`max-w-[85%] px-4 py-3 rounded-xl text-sm shadow-md ${
                    isFromAdmin
                      ? "ml-auto bg-teal-600/30 text-right"
                      : "mr-auto bg-gray-700/40 text-left"
                  }`}
                >
                  <div>{msg.content}</div>
                  <div className="mt-2 text-xs text-white/50">
                    {msg.senderName} •{" "}
                    {new Date(msg.createdAt).toLocaleString("vi-VN")}
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatBottomRef}></div>
        </div>

        {/* Nhập phản hồi */}
        {selectedUser && (
          <div className="flex items-center gap-2 mt-6">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Phản hồi khách hàng..."
              className="flex-1 px-4 py-3 text-sm text-white bg-gray-800 border rounded-full outline-none border-white/10 focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleReply}
              className="p-3 text-white bg-teal-600 rounded-full hover:bg-teal-700"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 6px;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
      `}</style>
    </section>
  );
}
