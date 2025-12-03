import { Suspense } from "react";
import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đăng nhập - VinhWorks | Hệ thống quản lý & Dịch vụ số",
  description:
    "Đăng nhập vào hệ thống VinhWorks để quản lý dự án, theo dõi tiến độ và sử dụng các dịch vụ cao cấp. Bảo mật và an toàn tuyệt đối.",
  openGraph: {
    title: "Đăng nhập - VinhWorks System",
    description:
      "Cổng truy cập hệ thống quản lý dự án và dịch vụ số VinhWorks. Trải nghiệm công nghệ quản lý hiện đại.",
    url: "https://vinhworks.com/login",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-login.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks Login",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Đăng nhập VinhWorks",
  description: "Trang đăng nhập an toàn vào hệ thống quản lý VinhWorks.",
  url: "https://vinhworks.com/login",
  publisher: {
    "@type": "Organization",
    name: "VinhWorks",
    logo: {
      "@type": "ImageObject",
      url: "https://vinhworks.com/logo.png",
    },
  },
};

export default function LoginPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
          </div>
        }
      >
        <LoginClient />
      </Suspense>
    </>
  );
}
