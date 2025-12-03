import { Suspense } from "react";
import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân | VinhWorks System",
  description:
    "Quản lý thông tin tài khoản, bảo mật và cài đặt cá nhân trên hệ thống VinhWorks.",
  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Hồ sơ người dùng - VinhWorks",
    description: "Trang quản lý thông tin và cài đặt tài khoản.",
    url: "https://vinhworks.com/profile",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-profile.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks User Profile",
      },
    ],
  },
};

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#fff7ed]">
          <div className="w-12 h-12 border-4 border-orange-200 rounded-full border-t-orange-500 animate-spin"></div>
        </div>
      }
    >
      <ProfileClient />
    </Suspense>
  );
}
