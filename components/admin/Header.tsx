"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isMobileMenuOpen?: boolean;
}

interface MessageItem {
  _id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isAdmin?: boolean;
  read?: boolean;
}

export default function Header({
  onToggleSidebar,
  isMobileMenuOpen = false,
}: HeaderProps) {
  const { user, loading, logout } = useUser();
  const [now, setNow] = useState<Date | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "LV";

  const fetchNotifications = useCallback(async () => {
    try {
      setNotificationsLoading(true);
      const response = await fetch("/api/messages", { cache: "no-store" });
      if (!response.ok) return;

      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Không thể tải thông báo tin nhắn:", error);
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchNotifications();
    const timer = window.setInterval(fetchNotifications, 15000);
    return () => window.clearInterval(timer);
  }, [fetchNotifications]);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setAccountOpen(false);
        setNotificationsOpen(false);
      }
    };

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  const unreadMessages = useMemo(
    () =>
      messages
        .filter((message) => !message.isAdmin && !message.read)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [messages],
  );

  const recentNotifications = unreadMessages.slice(0, 4);
  const unreadCount = unreadMessages.length;

  const date =
    now?.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) || "—";
  const time =
    now?.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }) || "--:--:--";

  return (
    <header className="relative z-40 h-[72px] shrink-0 border-b border-zinc-900 bg-white text-zinc-950">
      <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-5 lg:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <button
            id="sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Mở menu"
            className="grid h-11 w-11 shrink-0 place-items-center border border-zinc-900 bg-[#fff8e9] lg:hidden"
          >
            {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <div className="relative hidden md:block">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              ref={searchRef}
              type="search"
              placeholder="Tìm nhanh trong CMS..."
              className="h-11 w-[280px] border border-zinc-300 bg-[#fff8e9] pl-11 pr-14 text-xs font-semibold outline-none transition-shadow focus:border-zinc-900 focus:shadow-[3px_3px_0_#ffb21c] xl:w-[390px]"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 border border-zinc-300 bg-white px-2 py-1 text-[8px] font-black text-zinc-400">
              ⌘ K
            </kbd>
          </div>

          <div className="md:hidden">
            <p className="text-[8px] font-black uppercase tracking-[.18em] text-[#d98200]">
              VinhWorks
            </p>
            <p className="mt-1 text-xs font-black">Admin CMS</p>
          </div>
        </div>

        <div className="flex h-full items-center">
          <div className="hidden h-full items-center gap-3 border-x border-zinc-200 px-5 xl:flex">
            <CalendarDays size={15} className="text-[#d98200]" />
            <div>
              <p className="text-[8px] font-black uppercase tracking-[.12em] text-zinc-400">
                {date}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs font-black tabular-nums">
                <Clock3 size={12} />
                {time}
              </p>
            </div>
          </div>

          <div className="relative h-full border-r border-zinc-200">
            <button
              onClick={() => {
                setNotificationsOpen((value) => !value);
                setAccountOpen(false);
                fetchNotifications();
              }}
              aria-label="Thông báo"
              className="relative grid h-full w-14 place-items-center hover:bg-[#fff8e9] sm:w-16"
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <>
                  <span className="absolute right-4 top-5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
                  <span className="absolute right-2 top-3 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#ffb21c] px-1 text-[9px] font-black text-zinc-950 ring-2 ring-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                </>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-[calc(100%+1px)] w-[min(380px,calc(100vw-24px))] border border-zinc-900 bg-white shadow-[6px_6px_0_#ffb21c]"
                >
                  <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 p-4 text-white">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[.18em] text-[#ffb21c]">
                        Notifications
                      </p>
                      <h2 className="mt-1 text-base font-black">Thông báo mới</h2>
                    </div>
                    <span className="border border-white/30 px-2 py-1 text-[8px] font-black">
                      {String(unreadCount).padStart(2, "0")}
                    </span>
                  </div>

                  {notificationsLoading && recentNotifications.length === 0 ? (
                    <Notice
                      title="Đang kiểm tra"
                      text="CMS đang đồng bộ tin nhắn mới nhất."
                    />
                  ) : recentNotifications.length > 0 ? (
                    recentNotifications.map((message, index) => (
                      <Notice
                        key={message._id}
                        title={`Tin nhắn từ ${message.senderName || "khách hàng"}`}
                        text={message.content}
                        time={formatNotificationTime(message.createdAt)}
                        last={index === recentNotifications.length - 1}
                      />
                    ))
                  ) : (
                    <Notice
                      title="Không có tin mới"
                      text="Chưa có yêu cầu hỗ trợ mới cần xử lý."
                    />
                  )}

                  <Link
                    href="/admin/messages"
                    onClick={() => setNotificationsOpen(false)}
                    className="flex min-h-12 items-center justify-between border-t border-zinc-900 bg-[#fff8e9] px-4 text-[9px] font-black uppercase"
                  >
                    Xem tất cả <ExternalLink size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative h-full">
            <button
              onClick={() => {
                setAccountOpen((value) => !value);
                setNotificationsOpen(false);
              }}
              className={`flex h-full items-center gap-3 px-3 text-left sm:px-5 ${
                accountOpen ? "bg-[#fff8e9]" : "hover:bg-[#fff8e9]"
              }`}
            >
              <Avatar src={user?.avatar} initials={initials} size="md" />
              <div className="hidden min-w-0 lg:block">
                <p className="max-w-40 truncate text-xs font-black">
                  {loading ? "Đang tải..." : user?.name || "Lương Vinh"}
                </p>
                <p className="mt-1 text-[8px] font-black uppercase tracking-[.15em] text-[#d98200]">
                  {user?.role || "Admin"}
                </p>
              </div>
              <ChevronDown
                size={14}
                className={`hidden transition-transform sm:block ${
                  accountOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-[calc(100%+1px)] w-[290px] border border-zinc-900 bg-white shadow-[6px_6px_0_#ffb21c]"
                >
                  <div className="flex gap-3 border-b border-zinc-900 bg-[#fff8e9] p-4">
                    <Avatar src={user?.avatar} initials={initials} size="lg" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">
                        {user?.name || "Lương Vinh"}
                      </p>
                      <p className="mt-1 truncate text-[10px] text-zinc-500">
                        {user?.email || "Tài khoản quản trị"}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-2 border border-zinc-900 bg-white px-2 py-1 text-[8px] font-black uppercase">
                        <ShieldCheck size={11} className="text-[#d98200]" />
                        {user?.role || "Admin"}
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <AccountLink
                      href="/profile"
                      icon={<UserRound size={16} />}
                      label="Hồ sơ cá nhân"
                      close={() => setAccountOpen(false)}
                    />
                    <AccountLink
                      href="/admin/settings"
                      icon={<Settings size={16} />}
                      label="Cài đặt CMS"
                      close={() => setAccountOpen(false)}
                    />
                    <AccountLink
                      href="/admin/messages"
                      icon={<MessageCircle size={16} />}
                      label="Tin nhắn"
                      close={() => setAccountOpen(false)}
                    />
                  </div>

                  <div className="border-t border-zinc-900 p-2">
                    <button
                      onClick={() => logout()}
                      className="flex min-h-12 w-full items-center gap-3 px-3 text-[10px] font-black uppercase text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Avatar({
  src,
  initials,
  size = "md",
}: {
  src?: string;
  initials: string;
  size?: "md" | "lg";
}) {
  const dimension = size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <span
      className={`relative grid ${dimension} shrink-0 place-items-center overflow-hidden border border-zinc-900 bg-zinc-950 text-[10px] font-black text-[#ffb21c]`}
    >
      {src ? (
        <img src={src} alt="Ảnh đại diện" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
      <i className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
    </span>
  );
}

function AccountLink({
  href,
  icon,
  label,
  close,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  close: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={close}
      className="flex min-h-12 items-center gap-3 px-3 text-[10px] font-black uppercase hover:bg-[#fff8e9]"
    >
      <span className="grid h-8 w-8 place-items-center border border-zinc-300">
        {icon}
      </span>
      {label}
      <ExternalLink size={12} className="ml-auto" />
    </Link>
  );
}

function Notice({
  title,
  text,
  time,
  last = false,
}: {
  title: string;
  text: string;
  time?: string;
  last?: boolean;
}) {
  return (
    <div className={`flex gap-3 p-4 ${last ? "" : "border-b border-zinc-300"}`}>
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ffb21c]" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[10px] font-black uppercase">{title}</h3>
          {time && (
            <span className="ml-auto shrink-0 text-[9px] font-black text-zinc-400">
              {time}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-[10px] leading-5 text-zinc-500">
          {text}
        </p>
      </div>
    </div>
  );
}

function formatNotificationTime(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
