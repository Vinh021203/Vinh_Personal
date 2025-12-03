import { Suspense } from "react";
import { Metadata } from "next";
import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cài Đặt Tài Khoản | VinhWorks System",
  description:
    "Quản lý thông tin cá nhân, bảo mật mật khẩu và tùy chỉnh giao diện hệ thống VinhWorks.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "Quản lý tài khoản - VinhWorks",
    description: "Truy cập trang cài đặt để thay đổi thông tin và bảo mật.",
    url: "https://vinhworks.com/settings",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-system.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks System Settings",
      },
    ],
  },

  alternates: {
    canonical: "https://vinhworks.com/settings",
  },
};

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#fff7ed]">
          <div className="w-10 h-10 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin" />
        </div>
      }
    >
      <SettingsClient />
    </Suspense>
  );
}
