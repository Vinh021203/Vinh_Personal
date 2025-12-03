import { Suspense } from "react";
import { Metadata } from "next";
import RegisterClient from "./RegisterClient";
import Script from "next/script";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đăng Ký Tài Khoản | VinhWorks - Cộng Đồng Công Nghệ",
  description:
    "Tạo tài khoản VinhWorks ngay hôm nay để truy cập kho tài nguyên thiết kế, quản lý dự án và kết nối với cộng đồng lập trình viên chuyên nghiệp.",
  keywords: [
    "đăng ký vinhworks",
    "tạo tài khoản",
    "thiết kế website",
    "cộng đồng it",
    "vinhworks login",
  ],
  openGraph: {
    title: "Gia nhập đội ngũ VinhWorks ngay hôm nay",
    description:
      "Mở khóa tiềm năng sáng tạo của bạn. Truy cập các công cụ độc quyền và kho tài nguyên miễn phí.",
    url: "https://vinhworks.com/register",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-register.jpg",
        width: 1200,
        height: 630,
        alt: "Đăng ký tài khoản VinhWorks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đăng Ký Tài Khoản | VinhWorks",
    description: "Bắt đầu hành trình số của bạn cùng VinhWorks.",
    images: ["https://vinhworks.com/og-register.jpg"],
  },
  alternates: {
    canonical: "https://vinhworks.com/register",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Đăng ký tài khoản VinhWorks",
  description: "Trang đăng ký thành viên mới của hệ thống VinhWorks.",
  url: "https://vinhworks.com/register",
  potentialAction: {
    "@type": "RegisterAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://vinhworks.com/register",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://vinhworks.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Đăng ký",
        item: "https://vinhworks.com/register",
      },
    ],
  },
};

export default function RegisterPage() {
  return (
    <>
      <Script
        id="register-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-12 h-12 border-4 border-purple-200 rounded-full border-t-purple-600 animate-spin" />
          </div>
        }
      >
        <RegisterClient />
      </Suspense>
    </>
  );
}
