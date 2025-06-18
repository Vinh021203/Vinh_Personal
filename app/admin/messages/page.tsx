"use client";

import { useEffect, useState, useRef } from "react";
import {
  MessageCircle,
  Send,
  User,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Clock,
  Users,
  Mail,
  Filter,
  Archive,
  Star,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Activity,
  Circle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Avatar from "@/components/admin/Avatar";

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

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [mobileUserPanel, setMobileUserPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ useEffect 1: Fetch Messages (Fixed cache issue)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const timestamp = new Date().getTime();
        const res = await fetch(`/api/messages?t=${timestamp}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMessages(data);

        const adminMsg = data.find((msg: Message) => msg.isAdmin === true);
        if (adminMsg?.senderId) {
          setAdminId(adminMsg.senderId);
        }
      } catch (err) {
        console.error("Lỗi tải tin nhắn:", err);
        toast.error("Không thể tải tin nhắn!");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // ✅ useEffect 2: Auto Scroll (Optimized)
  useEffect(() => {
    const scrollToBottom = () => {
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    };

    if (messages.length > 0 && selectedUser) {
      scrollToBottom();
    }
  }, [messages, selectedUser]);

  // ✅ useEffect 3: Audio Notification (Improved)
  useEffect(() => {
    const playNotificationSound = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.log("Không thể phát âm thanh:", error);
      }
    };

    if (messages.length > 0 && !loading) {
      playNotificationSound();
    }
  }, [messages, loading]);

  // ✅ useEffect 4: Auto Refresh (New)
  useEffect(() => {
    if (!selectedUser) return;

    const refreshMessages = async () => {
      try {
        const timestamp = new Date().getTime();
        const res = await fetch(`/api/messages?t=${timestamp}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });

        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Auto refresh failed:", err);
      }
    };

    const interval = setInterval(refreshMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  // Create user info with last message and unread count
  const userInfos: UserInfo[] = Array.from(
    new Map(
      messages
        .filter((msg) => msg.senderId !== adminId)
        .map((msg) => [msg.senderId, msg.senderName])
    )
  ).map(([id, name]) => {
    const userMessages = messages.filter(
      (m) =>
        m.senderId === id || (m.senderId === adminId && m.receiverId === id)
    );
    const lastMessage = userMessages[userMessages.length - 1];
    const unreadCount = userMessages.filter(
      (m) => m.senderId === id && !m.read
    ).length;

    return {
      id: id as string,
      name: name as string,
      lastMessage: lastMessage?.content || "",
      lastMessageTime: lastMessage?.createdAt || "",
      unreadCount,
      isOnline: Math.random() > 0.5,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name as string
      )}&background=8b5cf6&color=fff&size=128`,
    };
  });

  const filteredUsers = userInfos.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" ||
        (filterStatus === "unread" && user.unreadCount > 0) ||
        (filterStatus === "online" && user.isOnline))
  );

  const filteredMessages = selectedUser
    ? messages.filter(
        (m) =>
          (m.senderId === selectedUser &&
            (!m.receiverId || m.receiverId === adminId)) ||
          (m.senderId === adminId && m.receiverId === selectedUser)
      )
    : [];

  const selectedUserInfo = userInfos.find((u) => u.id === selectedUser);

  // ✅ Enhanced handleReply with optimistic updates
  const handleReply = async () => {
    if (!reply.trim() || !selectedUser) return;

    const tempMessage: Message = {
      _id: `temp-${Date.now()}`,
      senderId: adminId || "admin",
      senderName: "Admin",
      receiverId: selectedUser,
      content: reply,
      createdAt: new Date().toISOString(),
      isAdmin: true,
      status: "sent",
    };

    // Optimistic update
    setMessages((prev) => [...prev, tempMessage]);
    const currentReply = reply;
    setReply("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          content: currentReply,
          receiverId: selectedUser,
          isAdmin: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const newMsg = await res.json();

      // Replace temp message with real message
      setMessages((prev) =>
        prev.map((msg) => (msg._id === tempMessage._id ? newMsg : msg))
      );

      // Force refresh after a delay to ensure sync
      setTimeout(async () => {
        try {
          const timestamp = new Date().getTime();
          const refreshRes = await fetch(`/api/messages?t=${timestamp}`, {
            cache: "no-store",
          });
          if (refreshRes.ok) {
            const refreshedMessages = await refreshRes.json();
            setMessages(refreshedMessages);
          }
        } catch (err) {
          console.error("Refresh after send failed:", err);
        }
      }, 500);

      toast.success("Đã gửi tin nhắn!");
    } catch (err) {
      console.error("Gửi phản hồi thất bại:", err);
      toast.error("Không thể gửi tin nhắn!");

      // Remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg._id !== tempMessage._id));
      setReply(currentReply); // Restore reply text
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  const getMessageStatus = (msg: Message) => {
    if (msg.status === "read")
      return <CheckCheck size={14} className="text-blue-400" />;
    if (msg.status === "delivered")
      return <CheckCheck size={14} className="text-gray-400" />;
    if (msg.status === "sent")
      return <Check size={14} className="text-gray-400" />;
    return <Clock size={14} className="text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 rounded-full border-purple-500/30"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <motion.p
            className="mt-6 text-lg font-medium text-purple-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Đang tải tin nhắn...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            color: "#fff",
            border: "1px solid rgba(147, 51, 234, 0.3)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
          },
        }}
      />

      <audio ref={audioRef} src="/ping.mp3" preload="auto" />

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ rotate: -15, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-3 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl"
          >
            <MessageCircle size={24} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Quản lý Tin nhắn
            </h1>
            <p className="mt-1 text-gray-400">Hỗ trợ khách hàng 24/7</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full bg-green-500/20 border-green-500/30">
            <Activity size={16} className="text-green-400" />
            <span className="text-sm font-medium text-green-300">Online</span>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="h-[calc(100vh-200px)] rounded-3xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 overflow-hidden"
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <div
            className={`w-80 border-r border-purple-500/20 flex flex-col ${
              mobileUserPanel ? "block" : "hidden md:flex"
            }`}
          >
            {/* Search & Filter */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="relative mb-4">
                <Search
                  className="absolute text-purple-400 transform -translate-y-1/2 left-3 top-1/2"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    filterStatus === "all"
                      ? "bg-purple-500 text-white"
                      : "bg-slate-700/50 text-gray-400 hover:text-white"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setFilterStatus("unread")}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    filterStatus === "unread"
                      ? "bg-purple-500 text-white"
                      : "bg-slate-700/50 text-gray-400 hover:text-white"
                  }`}
                >
                  Chưa đọc
                </button>
                <button
                  onClick={() => setFilterStatus("online")}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    filterStatus === "online"
                      ? "bg-purple-500 text-white"
                      : "bg-slate-700/50 text-gray-400 hover:text-white"
                  }`}
                >
                  Online
                </button>
              </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredUsers.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Không có người dùng nào</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredUsers.map((userInfo) => (
                    <motion.div
                      key={userInfo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 mb-2 ${
                        selectedUser === userInfo.id
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/50"
                          : "hover:bg-white/5"
                      }`}
                      onClick={() => {
                        setSelectedUser(userInfo.id);
                        setMobileUserPanel(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar
                            src={userInfo.avatar}
                            name={userInfo.name}
                            size={48}
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                              userInfo.isOnline ? "bg-green-400" : "bg-gray-400"
                            }`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white truncate">
                              {userInfo.name}
                            </h3>
                            {userInfo.unreadCount > 0 && (
                              <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                                {userInfo.unreadCount}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-400 truncate">
                            {userInfo.lastMessage || "Chưa có tin nhắn"}
                          </p>
                          {userInfo.lastMessageTime && (
                            <p className="mt-1 text-xs text-gray-500">
                              {new Date(
                                userInfo.lastMessageTime
                              ).toLocaleDateString("vi-VN")}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col flex-1">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-purple-500/20 bg-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setMobileUserPanel(true)}
                        className="p-2 text-purple-400 transition-all rounded-lg md:hidden hover:bg-purple-500/10"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="relative">
                        <Avatar
                          src={selectedUserInfo?.avatar}
                          name={selectedUserInfo?.name || "User"}
                          size={48}
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                            selectedUserInfo?.isOnline
                              ? "bg-green-400"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-white">
                          {selectedUserInfo?.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {selectedUserInfo?.isOnline
                            ? "Đang online"
                            : "Offline"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 transition-all rounded-lg hover:text-white hover:bg-white/10">
                        <Phone size={20} />
                      </button>
                      <button className="p-2 text-gray-400 transition-all rounded-lg hover:text-white hover:bg-white/10">
                        <Video size={20} />
                      </button>
                      <button className="p-2 text-gray-400 transition-all rounded-lg hover:text-white hover:bg-white/10">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <div className="space-y-4">
                    {filteredMessages.length === 0 ? (
                      <div className="py-12 text-center text-gray-400">
                        <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Chưa có tin nhắn nào</p>
                        <p className="mt-2 text-sm">
                          Hãy bắt đầu cuộc trò chuyện!
                        </p>
                      </div>
                    ) : (
                      filteredMessages.map((msg, index) => {
                        const isFromAdmin = msg.senderId === adminId;
                        const showAvatar =
                          index === 0 ||
                          filteredMessages[index - 1].senderId !== msg.senderId;

                        return (
                          <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex gap-3 ${
                              isFromAdmin ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            {showAvatar && (
                              <div className="flex-shrink-0">
                                {isFromAdmin ? (
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                                    <span className="text-sm font-bold text-white">
                                      A
                                    </span>
                                  </div>
                                ) : (
                                  <Avatar
                                    src={selectedUserInfo?.avatar}
                                    name={selectedUserInfo?.name || "User"}
                                    size={32}
                                  />
                                )}
                              </div>
                            )}

                            <div
                              className={`max-w-[70%] ${
                                !showAvatar
                                  ? isFromAdmin
                                    ? "mr-11"
                                    : "ml-11"
                                  : ""
                              }`}
                            >
                              <div
                                className={`px-4 py-3 rounded-2xl shadow-lg ${
                                  isFromAdmin
                                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                                    : "bg-slate-700/50 text-white border border-purple-500/20"
                                }`}
                              >
                                <p className="text-sm leading-relaxed">
                                  {msg.content}
                                </p>
                              </div>

                              <div
                                className={`flex items-center gap-2 mt-1 text-xs text-gray-400 ${
                                  isFromAdmin ? "justify-end" : "justify-start"
                                }`}
                              >
                                <span>
                                  {new Date(msg.createdAt).toLocaleTimeString(
                                    "vi-VN",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                                {isFromAdmin && getMessageStatus(msg)}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                    <div ref={chatBottomRef}></div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-purple-500/20 bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 transition-all rounded-lg hover:text-white hover:bg-white/10">
                      <Paperclip size={20} />
                    </button>

                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập tin nhắn..."
                        className="w-full px-4 py-3 pr-12 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:border-purple-400/50"
                      />
                      <button className="absolute p-1 text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-white">
                        <Smile size={18} />
                      </button>
                    </div>

                    <motion.button
                      onClick={handleReply}
                      disabled={!reply.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-1">
                <div className="text-center">
                  <MessageCircle className="w-24 h-24 mx-auto mb-6 text-purple-400/50" />
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Chọn cuộc trò chuyện
                  </h3>
                  <p className="text-gray-400">
                    Chọn một người dùng để bắt đầu trò chuyện
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(147, 51, 234, 0.5),
            rgba(59, 130, 246, 0.5)
          );
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(147, 51, 234, 0.7),
            rgba(59, 130, 246, 0.7)
          );
        }

        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .custom-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </div>
  );
}
