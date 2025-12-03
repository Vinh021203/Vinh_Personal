"use client";

import { useEffect, useState, useRef } from "react";
import {
  MessageCircle,
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Plus,
  Check,
  CheckCheck,
  ChevronLeft,
  Mic,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

// --- Interfaces ---
interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  receiverId?: string;
  content: string;
  createdAt: string;
  isAdmin?: boolean;
  read?: boolean;
  status?: "sent" | "delivered" | "read";
}

interface UserInfo {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline?: boolean;
  avatar?: string;
}

export default function AdminMessagesClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // State lưu thông tin users để map avatar
  const [usersMap, setUsersMap] = useState<Record<string, any>>({});

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Fetch Data ---
  useEffect(() => {
    const initData = async () => {
      try {
        // 1. Get Users List & Admin Info
        const usersRes = await fetch("/api/users");
        const usersData = await usersRes.json();

        // Tạo map để tra cứu nhanh user info từ ID
        const map: Record<string, any> = {};
        let adminIdFound = null;

        if (Array.isArray(usersData)) {
          usersData.forEach((u: any) => {
            map[u._id] = u; // Lưu ý key là _id từ mongoDB
            if (u.role === "admin") adminIdFound = u._id;
          });
        }
        setUsersMap(map);
        if (adminIdFound) setCurrentAdminId(adminIdFound);

        // 2. Get Messages
        const timestamp = new Date().getTime();
        const res = await fetch(`/api/messages?t=${timestamp}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        // toast.error("Không thể tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    initData();
    const interval = setInterval(initData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (messages.length > 0 && selectedUser) {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [messages, selectedUser]);

  // --- Logic Process User List ---
  const userListMap = new Map<string, UserInfo>();

  messages.forEach((msg) => {
    // Nếu người gửi không phải là admin hiện tại -> đó là khách hàng
    if (msg.senderId !== currentAdminId) {
      if (!userListMap.has(msg.senderId)) {
        // Lấy thông tin user từ usersMap đã fetch
        const userProfile = usersMap[msg.senderId] || {};

        userListMap.set(msg.senderId, {
          id: msg.senderId,
          name: userProfile.name || msg.senderName || "Khách hàng",
          // Ưu tiên avatar từ User Profile, nếu không có thì dùng Dicebear fallback
          avatar:
            userProfile.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderId}`,
          unreadCount: 0,
          isOnline: Math.random() > 0.5, // Mock status
        });
      }

      const user = userListMap.get(msg.senderId)!;
      user.lastMessage = msg.content;
      user.lastMessageTime = msg.createdAt;
      if (!msg.read && !msg.isAdmin) user.unreadCount! += 1;
    }
  });

  const userInfos = Array.from(userListMap.values()).sort((a, b) => {
    return (
      new Date(b.lastMessageTime || 0).getTime() -
      new Date(a.lastMessageTime || 0).getTime()
    );
  });

  const filteredUsers = userInfos.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" ||
        (filterStatus === "unread" && user.unreadCount! > 0))
  );

  const filteredMessages = selectedUser
    ? messages.filter(
        (m) => m.senderId === selectedUser || m.receiverId === selectedUser
      )
    : [];

  const selectedUserInfo = userInfos.find((u) => u.id === selectedUser);

  // --- Handlers ---
  const handleReply = async () => {
    if (!reply.trim() || !selectedUser || !currentAdminId) return;

    const tempId = `temp-${Date.now()}`;
    const newMessage: Message = {
      _id: tempId,
      senderId: currentAdminId,
      senderName: "Admin",
      receiverId: selectedUser,
      content: reply,
      createdAt: new Date().toISOString(),
      isAdmin: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setReply("");

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newMessage.content,
          receiverId: selectedUser,
          isAdmin: true,
        }),
      });
    } catch (error) {
      toast.error("Gửi tin nhắn thất bại");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    return isToday
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin" />
          <p className="text-sm font-bold text-slate-400 animate-pulse">
            Đang tải tin nhắn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-40px)] flex flex-col pb-4">
      <Toaster position="top-right" />

      {/* 1. HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-between px-1 mb-6 md:flex-row"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white border border-orange-100 shadow-sm rounded-2xl">
            <MessageCircle size={24} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
              Trung tâm tin nhắn
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Kết nối và hỗ trợ khách hàng
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. MAIN LAYOUT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white border border-orange-100 rounded-[32px] shadow-xl overflow-hidden flex relative"
      >
        {/* --- SIDEBAR (USER LIST) --- */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col bg-slate-50/50 ${
            selectedUser ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search Header */}
          <div className="sticky top-0 z-10 p-5 border-b bg-white/80 backdrop-blur-md border-slate-100">
            <div className="relative mb-4 group">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
              />
            </div>
            <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "Tất cả" },
                { id: "unread", label: "Chưa đọc" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterStatus(filter.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    filterStatus === filter.id
                      ? "bg-slate-800 text-white shadow-md shadow-slate-800/20"
                      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* List Users */}
          <div className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
            {filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <p className="text-sm font-medium">
                  Không tìm thấy cuộc hội thoại
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`group p-3 rounded-2xl cursor-pointer transition-all relative ${
                    selectedUser === user.id
                      ? "bg-white shadow-md shadow-orange-100 border border-orange-100 ring-1 ring-orange-500/20"
                      : "hover:bg-white hover:shadow-sm border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 overflow-hidden border-2 border-white rounded-full shadow-sm bg-slate-100">
                        <Image
                          src={user.avatar || "/placeholder.jpg"}
                          alt=""
                          width={48}
                          height={48}
                          className="object-cover"
                          unoptimized // Fix lỗi load ảnh từ nguồn ngoài nếu chưa config domain
                          onError={(e) => {
                            e.currentTarget.srcset = "/placeholder.jpg"; // Fallback nếu ảnh lỗi
                          }}
                        />
                      </div>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm ring-1 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3
                          className={`text-sm font-bold truncate ${
                            selectedUser === user.id
                              ? "text-slate-800"
                              : "text-slate-700"
                          }`}
                        >
                          {user.name}
                        </h3>
                        {user.lastMessageTime && (
                          <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2">
                            {formatMessageTime(user.lastMessageTime)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs truncate max-w-[140px] ${
                            user.unreadCount! > 0
                              ? "font-bold text-slate-800"
                              : "text-slate-500"
                          }`}
                        >
                          {user.lastMessage || "Đã gửi tin nhắn"}
                        </p>
                        {user.unreadCount! > 0 && (
                          <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full shadow-sm shadow-orange-500/30 animate-pulse">
                            {user.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- CHAT AREA --- */}
        <div
          className={`flex-1 flex flex-col bg-white relative ${
            !selectedUser ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="absolute top-0 z-20 flex items-center justify-between w-full h-20 px-6 border-b shadow-sm border-slate-100 bg-white/90 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 -ml-2 transition-colors rounded-full md:hidden text-slate-500 hover:bg-slate-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={selectedUserInfo?.avatar || "/placeholder.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        className="object-cover border rounded-full shadow-sm"
                        unoptimized
                      />
                      {selectedUserInfo?.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        {selectedUserInfo?.name}
                      </h2>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        {selectedUserInfo?.isOnline ? (
                          <span className="font-medium text-green-600">
                            Đang hoạt động
                          </span>
                        ) : (
                          "Hoạt động 5p trước"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 md:gap-2">
                  <button className="p-2.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                    <Phone size={20} />
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                    <Video size={20} />
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 p-4 pt-24 pb-4 overflow-y-auto bg-slate-50/30 custom-scrollbar">
                <div className="flex flex-col max-w-3xl gap-2 mx-auto">
                  <div className="flex justify-center my-4">
                    <span className="px-3 py-1 text-[10px] font-bold text-slate-400 bg-slate-100 rounded-full uppercase tracking-wider">
                      Hôm nay
                    </span>
                  </div>

                  {filteredMessages.map((msg, index) => {
                    const isMe = msg.senderId === currentAdminId || msg.isAdmin;
                    const showAvatar =
                      index === 0 ||
                      filteredMessages[index - 1].senderId !== msg.senderId;

                    return (
                      <motion.div
                        key={msg._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${
                          isMe ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {!isMe && (
                          <div
                            className={`w-8 h-8 shrink-0 flex flex-col justify-end ${
                              !showAvatar && "invisible"
                            }`}
                          >
                            <Image
                              src={
                                selectedUserInfo?.avatar || "/placeholder.jpg"
                              }
                              alt=""
                              width={32}
                              height={32}
                              className="object-cover bg-white border rounded-full border-slate-200"
                              unoptimized
                            />
                          </div>
                        )}

                        <div
                          className={`flex flex-col max-w-[75%] md:max-w-[60%] ${
                            isMe ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words ${
                              isMe
                                ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-tr-none"
                                : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                            }`}
                          >
                            {msg.content}
                          </div>
                          <div
                            className={`flex items-center gap-1.5 mt-1 text-[10px] font-medium ${
                              isMe
                                ? "text-slate-400 flex-row-reverse"
                                : "text-slate-400"
                            }`}
                          >
                            <span>
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {isMe &&
                              (msg.status === "read" ? (
                                <CheckCheck
                                  size={14}
                                  className="text-blue-500"
                                />
                              ) : msg.status === "delivered" ? (
                                <CheckCheck
                                  size={14}
                                  className="text-slate-400"
                                />
                              ) : (
                                <Check size={14} className="text-slate-400" />
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={chatBottomRef} className="h-px" />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="max-w-3xl mx-auto flex items-end gap-2 bg-slate-50 p-2 rounded-[24px] border border-slate-200 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                  <button className="p-3 transition-all rounded-full text-slate-400 hover:text-slate-600 hover:bg-white">
                    <Plus size={20} />
                  </button>
                  <button className="hidden p-3 transition-all rounded-full sm:block text-slate-400 hover:text-slate-600 hover:bg-white">
                    <ImageIcon size={20} />
                  </button>

                  <textarea
                    ref={textareaRef}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 bg-transparent border-none focus:ring-0 py-3 px-2 text-sm font-medium text-slate-700 placeholder:text-slate-400 resize-none max-h-32 min-h-[44px] outline-none custom-scrollbar"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />

                  {reply.trim() ? (
                    <button
                      onClick={handleReply}
                      className="p-3 text-white transition-all bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 shadow-orange-500/30 active:scale-95"
                    >
                      <Send size={18} fill="currentColor" className="ml-0.5" />
                    </button>
                  ) : (
                    <button className="p-3 transition-all rounded-full text-slate-400 hover:text-slate-600 hover:bg-white">
                      <Mic size={20} />
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-slate-50/50">
              <div className="flex items-center justify-center w-32 h-32 mb-6 bg-white rounded-full shadow-lg shadow-slate-200/50 animate-float">
                <div className="relative">
                  <MessageCircle size={64} className="text-orange-500" />
                  <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -top-1 -right-1 animate-pulse"></div>
                </div>
              </div>
              <h2 className="mb-2 text-2xl font-extrabold text-slate-800">
                Xin chào, Admin! 👋
              </h2>
              <p className="max-w-xs mx-auto text-slate-500">
                Chọn một cuộc hội thoại từ danh sách bên trái để bắt đầu hỗ trợ
                khách hàng ngay.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
