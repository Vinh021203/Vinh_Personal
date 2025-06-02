'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  MessageCircle,
  Settings,
  Wrench,
  Home,
} from 'lucide-react';

type Props = {
  onClose?: () => void;
};

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Bài viết', href: '/admin/posts', icon: FileText },
  { label: 'Dự án', href: '/admin/projects', icon: FolderKanban },
  { label: 'Dịch vụ', href: '/admin/services', icon: Wrench },
  { label: 'Người dùng', href: '/admin/users', icon: Users },
  // { label: 'Tin nhắn', href: '/admin/messages', icon: MessageCircle },
  { label: 'Cài đặt', href: '/admin/settings', icon: Settings },
  { label: 'Về trang chủ', href: '/', icon: Home },
];

export default function Sidebar({ onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-full flex flex-col bg-gradient-to-b from-[#0f172a] text-white border-r border-white/10 shadow-xl">
      {/* Header */}
      <div className="flex-shrink-0 py-6 text-center border-b border-white/10">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Admin Panel
        </h2>
        <p className="text-xs text-slate-400">Quản trị hệ thống</p>
      </div>

      {/* Menu scrollable */}
      <div className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all
                ${isActive
                  ? 'bg-teal-600 text-white shadow-inner'
                  : 'hover:bg-white/10 text-slate-300'}
              `}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer fixed */}
      <div className="px-4 py-3 border-t border-white/10 flex-shrink-0 bg-[#0f172a]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500">
            A
          </div>
          <div className="truncate">
            <p className="font-semibold text-white">Admin</p>
            <p className="text-xs truncate text-slate-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
