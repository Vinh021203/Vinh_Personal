"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCheck,
  Clock3,
  Mail,
  MessageCircle,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type MessageStatus = "sent" | "delivered" | "read";

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  receiverId?: string | null;
  content: string;
  createdAt: string;
  isAdmin?: boolean;
  read?: boolean;
  status?: MessageStatus;
}

interface UserRecord {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

interface Conversation {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  totalMessages: number;
}

const fallbackAvatar = "/vinhworks-favicon-512.png";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatTime(dateString?: string) {
  if (!dateString) return "--:--";

  const date = new Date(dateString);
  const now = new Date();
  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (sameDay) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

function initials(name?: string) {
  const value = name?.trim() || "KH";
  return value
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AdminMessagesClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [usersMap, setUsersMap] = useState<Record<string, UserRecord>>({});
  const [currentAdminId, setCurrentAdminId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread">("all");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fetchData = useCallback(async (silent = false) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [usersRes, messagesRes] = await Promise.all([
        fetch("/api/users", { cache: "no-store" }),
        fetch("/api/messages", { cache: "no-store" }),
      ]);

      if (!usersRes.ok || !messagesRes.ok) {
        throw new Error("Không thể tải dữ liệu tin nhắn");
      }

      const usersData = await usersRes.json();
      const messagesData = await messagesRes.json();
      const nextUsersMap: Record<string, UserRecord> = {};
      let adminId: string | null = null;

      if (Array.isArray(usersData)) {
        usersData.forEach((user: UserRecord) => {
          if (!user?._id) return;
          nextUsersMap[user._id] = user;
          if (user.role === "admin") adminId = user._id;
        });
      }

      setUsersMap(nextUsersMap);
      setCurrentAdminId(adminId);
      setMessages(Array.isArray(messagesData) ? messagesData : []);
    } catch (error) {
      console.error(error);
      if (!silent) toast.error("Không thể tải trung tâm tin nhắn");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = window.setInterval(() => fetchData(true), 15000);

    return () => window.clearInterval(interval);
  }, [fetchData]);

  const conversations = useMemo<Conversation[]>(() => {
    const map = new Map<string, Conversation>();

    messages.forEach((message) => {
      const customerId =
        message.senderId === currentAdminId ? message.receiverId : message.senderId;

      if (!customerId || customerId === currentAdminId || customerId === "admin") {
        return;
      }

      const profile = usersMap[customerId];
      const current = map.get(customerId);
      const next: Conversation = current || {
        id: customerId,
        name:
          profile?.name ||
          (message.senderId === customerId ? message.senderName : undefined) ||
          "Khách hàng",
        email: profile?.email,
        avatar: profile?.avatar,
        lastMessage: "",
        lastMessageTime: "",
        unreadCount: 0,
        totalMessages: 0,
      };

      next.lastMessage = message.content;
      next.lastMessageTime = message.createdAt;
      next.totalMessages += 1;

      if (message.senderId === customerId && !message.read && !message.isAdmin) {
        next.unreadCount += 1;
      }

      map.set(customerId, next);
    });

    return Array.from(map.values()).sort(
      (a, b) =>
        new Date(b.lastMessageTime || 0).getTime() -
        new Date(a.lastMessageTime || 0).getTime(),
    );
  }, [currentAdminId, messages, usersMap]);

  const filteredConversations = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const matchesSearch =
        !keyword ||
        conversation.name.toLowerCase().includes(keyword) ||
        conversation.email?.toLowerCase().includes(keyword);
      const matchesFilter =
        filterStatus === "all" || conversation.unreadCount > 0;

      return matchesSearch && matchesFilter;
    });
  }, [conversations, filterStatus, searchTerm]);

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedUser),
    [conversations, selectedUser],
  );

  const selectedMessages = useMemo(() => {
    if (!selectedUser) return [];

    return messages.filter(
      (message) =>
        message.senderId === selectedUser || message.receiverId === selectedUser,
    );
  }, [messages, selectedUser]);

  const unreadTotal = conversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0,
  );

  useEffect(() => {
    if (!selectedUser) return;

    const timeout = window.setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [selectedMessages.length, selectedUser]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedUser(conversationId);
    setMessages((prev) =>
      prev.map((message) =>
        message.senderId === conversationId && !message.isAdmin
          ? { ...message, read: true, status: "read" }
          : message,
      ),
    );
    fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId }),
    }).catch((error) => console.error("Mark read failed:", error));
  };

  const handleReply = async () => {
    const trimmedReply = reply.trim();
    if (!trimmedReply || !selectedUser || !currentAdminId || sending) return;

    const optimisticMessage: Message = {
      _id: `temp-${Date.now()}`,
      senderId: currentAdminId,
      senderName: "Admin",
      receiverId: selectedUser,
      content: trimmedReply,
      createdAt: new Date().toISOString(),
      isAdmin: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setReply("");
    setSending(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: trimmedReply,
          receiverId: selectedUser,
          isAdmin: true,
        }),
      });

      if (!response.ok) throw new Error("Send failed");

      const savedMessage = await response.json();
      setMessages((prev) =>
        prev.map((message) =>
          message._id === optimisticMessage._id ? savedMessage : message,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Gửi tin nhắn thất bại");
      setMessages((prev) =>
        prev.filter((message) => message._id !== optimisticMessage._id),
      );
      setReply(trimmedReply);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleReply();
    }
  };

  const handleTextareaInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${Math.min(event.target.scrollHeight, 132)}px`;
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="border border-zinc-950 bg-zinc-950 px-8 py-6 text-center text-white shadow-[8px_8px_0_#ffb21c]">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#ffb21c] border-t-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.28em]">
            Đang tải tin nhắn
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8e9] px-4 pb-10 pt-6 text-zinc-950 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <section className="grid overflow-hidden border border-zinc-950 bg-[#fff8e9] shadow-[8px_8px_0_#ffb21c] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-5 sm:p-7 lg:p-9">
          <div className="mb-8 inline-flex -rotate-2 items-center gap-2 border border-zinc-950 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.28em] shadow-[4px_4px_0_#ffb21c]">
            <Sparkles className="h-4 w-4 text-[#e18400]" />
            Customer support
          </div>

          <h1 className="max-w-3xl text-[clamp(3.2rem,9vw,7.4rem)] font-black leading-[0.82] tracking-[-0.08em]">
            Trung tâm
            <span className="block text-[#e18400]">tin nhắn.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            Theo dõi hội thoại khách hàng, phản hồi nhanh và giữ mọi yêu cầu
            hỗ trợ trong một khu vực CMS gọn gàng.
          </p>
        </div>

        <div className="border-t border-zinc-950 bg-zinc-950 p-5 text-white lg:border-l lg:border-t-0 sm:p-7 lg:p-9">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#ffb21c]">
              Inbox snapshot
            </p>
            <span className="border border-[#ffb21c] px-3 py-2 text-xs font-black uppercase text-[#ffb21c]">
              CMS
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Hội thoại", conversations.length.toString().padStart(2, "0")],
              ["Chưa đọc", unreadTotal.toString().padStart(2, "0")],
              ["Tin nhắn", messages.length.toString().padStart(2, "0")],
              ["Đang chọn", selectedConversation ? "01" : "00"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border border-white/20 bg-white/[0.04] p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">
                  {label}
                </p>
                <p className="mt-4 text-4xl font-black leading-none text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => fetchData(true)}
            className="mt-6 inline-flex items-center gap-3 border border-[#ffb21c] bg-[#ffb21c] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 shadow-[5px_5px_0_rgba(255,178,28,0.25)] transition hover:-translate-y-0.5"
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            Làm mới inbox
          </button>
        </div>
      </section>

      <section className="mt-8 overflow-hidden border border-zinc-950 bg-white shadow-[8px_8px_0_#ffb21c]">
        <div className="grid h-[calc(100dvh-220px)] min-h-[560px] max-h-[780px] lg:grid-cols-[390px_minmax(0,1fr)]">
          <aside
            className={cn(
              "border-zinc-950 bg-[#fff8e9] lg:border-r",
              selectedUser ? "hidden lg:block" : "block",
            )}
          >
            <div className="border-b border-zinc-950 p-4 sm:p-5">
              <div className="flex items-center gap-3 border border-zinc-950 bg-white px-4 py-3 shadow-[4px_4px_0_#ffb21c]">
                <Search className="h-5 w-5 text-slate-500" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Tìm khách hàng, email..."
                  className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "unread", label: "Chưa đọc" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setFilterStatus(filter.id as "all" | "unread")}
                    className={cn(
                      "border border-zinc-950 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] transition",
                      filterStatus === filter.id
                        ? "bg-zinc-950 text-white shadow-[4px_4px_0_#ffb21c]"
                        : "bg-white text-zinc-950 hover:bg-[#fff3d8]",
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="scrollbar-hide h-full overflow-y-auto overscroll-contain p-4 sm:p-5">
              {filteredConversations.length === 0 ? (
                <div className="border border-dashed border-zinc-300 bg-white p-6 text-center">
                  <MessageCircle className="mx-auto mb-3 h-9 w-9 text-[#e18400]" />
                  <p className="text-sm font-black uppercase tracking-[0.16em]">
                    Chưa có hội thoại
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Khi khách gửi tin nhắn, danh sách sẽ xuất hiện tại đây.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredConversations.map((conversation, index) => {
                    const active = selectedUser === conversation.id;

                    return (
                      <button
                        key={conversation.id}
                        type="button"
                        onClick={() => handleSelectConversation(conversation.id)}
                        className={cn(
                          "group w-full border p-4 text-left transition",
                          active
                            ? "border-zinc-950 bg-zinc-950 text-white shadow-[5px_5px_0_#ffb21c]"
                            : "border-zinc-200 bg-white hover:border-zinc-950 hover:shadow-[5px_5px_0_#ffb21c]",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-zinc-950 bg-[#ffb21c]">
                            {conversation.avatar ? (
                              <Image
                                src={conversation.avatar}
                                alt={conversation.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm font-black">
                                {initials(conversation.name)}
                              </div>
                            )}
                            <span className="absolute bottom-0 right-0 h-3 w-3 border border-zinc-950 bg-emerald-400" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="truncate text-base font-black">
                                {conversation.name}
                              </p>
                              <span
                                className={cn(
                                  "text-[11px] font-black",
                                  active ? "text-white/55" : "text-slate-400",
                                )}
                              >
                                {formatTime(conversation.lastMessageTime)}
                              </span>
                            </div>

                            {conversation.email && (
                              <p
                                className={cn(
                                  "mt-1 truncate text-xs font-bold",
                                  active ? "text-white/55" : "text-slate-400",
                                )}
                              >
                                {conversation.email}
                              </p>
                            )}

                            <p
                              className={cn(
                                "mt-2 line-clamp-2 text-sm font-semibold leading-6",
                                active ? "text-white/70" : "text-slate-600",
                              )}
                            >
                              {conversation.lastMessage}
                            </p>
                          </div>

                          <div className="flex shrink-0 flex-col items-end gap-2">
                            <span
                              className={cn(
                                "text-[11px] font-black text-[#e18400]",
                                active && "text-[#ffb21c]",
                              )}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {conversation.unreadCount > 0 && (
                              <span className="grid h-6 min-w-6 place-items-center bg-[#ff6a00] px-2 text-xs font-black text-white">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>

          <main className={cn("flex min-h-0 flex-col", !selectedUser && "hidden lg:flex")}>
            {selectedConversation ? (
              <>
                <div className="flex items-center justify-between gap-4 border-b border-zinc-950 bg-white p-4 sm:p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(null)}
                      className="grid h-11 w-11 place-items-center border border-zinc-950 bg-[#fff8e9] lg:hidden"
                      aria-label="Quay lại danh sách hội thoại"
                    >
                      <ArrowRight className="h-5 w-5 rotate-180" />
                    </button>

                    <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-zinc-950 bg-[#ffb21c]">
                      {selectedConversation.avatar ? (
                        <Image
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-black">
                          {initials(selectedConversation.name)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-black">
                        {selectedConversation.name}
                      </h2>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <span className="h-2 w-2 bg-emerald-400" />
                          Online
                        </span>
                        {selectedConversation.email && (
                          <span className="inline-flex items-center gap-1 normal-case tracking-normal">
                            <Mail className="h-3.5 w-3.5" />
                            {selectedConversation.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="border border-zinc-950 bg-[#fff8e9] px-3 py-2 text-xs font-black uppercase tracking-[0.14em]">
                      {selectedConversation.totalMessages} tin
                    </span>
                    <span className="border border-zinc-950 bg-zinc-950 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">
                      Support
                    </span>
                  </div>
                </div>

                <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(rgba(255,178,28,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,178,28,0.06)_1px,transparent_1px)] bg-[size:34px_34px] p-4 sm:p-6">
                  <div className="mx-auto flex max-w-4xl flex-col gap-4">
                    {selectedMessages.map((message, index) => {
                      const isMine = message.senderId === currentAdminId || message.isAdmin;
                      const previous = selectedMessages[index - 1];
                      const showMeta = !previous || previous.senderId !== message.senderId;

                      return (
                        <div
                          key={message._id}
                          className={cn("flex gap-3", isMine ? "justify-end" : "justify-start")}
                        >
                          {!isMine && showMeta && (
                            <div className="relative mt-1 h-9 w-9 shrink-0 overflow-hidden border border-zinc-950 bg-[#ffb21c]">
                              {selectedConversation.avatar ? (
                                <Image
                                  src={selectedConversation.avatar}
                                  alt={selectedConversation.name}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] font-black">
                                  {initials(selectedConversation.name)}
                                </div>
                              )}
                            </div>
                          )}

                          {!isMine && !showMeta && <div className="h-9 w-9 shrink-0" />}

                          <div className={cn("max-w-[78%]", isMine && "text-right")}>
                            {showMeta && (
                              <div
                                className={cn(
                                  "mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400",
                                  isMine && "justify-end",
                                )}
                              >
                                <span>{isMine ? "Admin" : selectedConversation.name}</span>
                                <span>•</span>
                                <span>{formatTime(message.createdAt)}</span>
                              </div>
                            )}

                            <div
                              className={cn(
                                "border px-4 py-3 text-sm font-semibold leading-7 shadow-[4px_4px_0_rgba(0,0,0,0.08)] sm:text-base",
                                isMine
                                  ? "border-zinc-950 bg-[#ffb21c] text-zinc-950"
                                  : "border-zinc-200 bg-white text-slate-700",
                              )}
                            >
                              {message.content}
                            </div>

                            {isMine && (
                              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                                <CheckCheck className="h-3.5 w-3.5" />
                                {message.status === "read" ? "Đã đọc" : "Đã gửi"}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatBottomRef} />
                  </div>
                </div>

                <div className="border-t border-zinc-950 bg-white p-4 sm:p-5">
                  <div className="mx-auto flex max-w-4xl items-end gap-3">
                    <textarea
                      ref={textareaRef}
                      value={reply}
                      onChange={handleTextareaInput}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      placeholder="Nhập phản hồi cho khách hàng..."
                      className="scrollbar-hide min-h-[54px] flex-1 resize-none border border-zinc-950 bg-[#fff8e9] px-4 py-4 text-sm font-semibold leading-6 outline-none transition placeholder:text-slate-400 focus:shadow-[4px_4px_0_#ffb21c]"
                    />
                    <button
                      type="button"
                      onClick={handleReply}
                      disabled={!reply.trim() || sending}
                      className="grid h-[54px] w-[54px] shrink-0 place-items-center border border-zinc-950 bg-zinc-950 text-white shadow-[4px_4px_0_#ffb21c] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Gửi tin nhắn"
                    >
                      {sending ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mx-auto mt-3 max-w-4xl text-xs font-bold text-slate-400">
                    Nhấn Enter để gửi, Shift + Enter để xuống dòng.
                  </p>
                </div>
              </>
            ) : (
              <div className="grid flex-1 place-items-center bg-[radial-gradient(circle_at_center,rgba(255,178,28,0.18),transparent_32%)] p-8 text-center">
                <div className="max-w-md">
                  <div className="mx-auto mb-6 grid h-24 w-24 place-items-center border border-zinc-950 bg-white shadow-[7px_7px_0_#ffb21c]">
                    <MessageCircle className="h-11 w-11 text-[#e18400]" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.32em] text-[#e18400]">
                    Support ready
                  </p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.06em]">
                    Chọn một hội thoại để bắt đầu.
                  </h2>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
                    Mọi tin nhắn mới sẽ được đồng bộ tự động. Bạn cũng có thể
                    bấm “Làm mới inbox” nếu muốn kiểm tra ngay.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      <section className="mt-8 grid gap-4 border border-zinc-950 bg-zinc-950 p-4 text-white shadow-[8px_8px_0_#ffb21c] sm:grid-cols-3">
        {[
          [Clock3, "Phản hồi nhanh", "Giữ nhịp hỗ trợ khách hàng trong CMS."],
          [UserRound, "Theo dõi khách", "Nhận diện từng hội thoại rõ ràng."],
          [MessageCircle, "Tập trung", "Không thất lạc tin nhắn quan trọng."],
        ].map(([Icon, title, desc]) => {
          const IconComponent = Icon as typeof Clock3;

          return (
            <div key={title as string} className="border border-white/15 p-4">
              <IconComponent className="mb-3 h-5 w-5 text-[#ffb21c]" />
              <p className="text-sm font-black uppercase tracking-[0.16em]">
                {title as string}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/60">
                {desc as string}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
