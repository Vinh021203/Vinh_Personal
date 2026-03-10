import "../styles/globals.css";
import { Poppins } from "next/font/google";
import AppWrapper from "@/components/AppWrapper";
import { UserProvider } from "@/contexts/UserContext";
import NextTopLoader from "nextjs-toploader";
import PageTransition from "@/components/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "VinhWorks | Nền tảng lập trình hiện đại",
  description:
    "VinhWorks giúp lập trình viên phát triển sản phẩm nhanh, đẹp, và tối ưu với công nghệ hiện đại.",
  keywords: [
    "VinhWorks",
    "lập trình",
    "developer",
    "nền tảng",
    "frontend",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "VinhWorks Team", url: "https://vinhwork.vercel.app" }], // Đã sửa lại link cho đúng domain mới

  // 👇 QUAN TRỌNG: Thêm mã xác minh Google ở đây
  verification: {
    google: "-elT34SlFd-jN8jKj04dMDqIwcUy-DV2eEIc3k90uLQ",
  },

  openGraph: {
    title: "VinhWorks",
    description:
      "Nền tảng giúp lập trình viên phát triển sản phẩm đẹp và nhanh.",
    url: "https://vinhwork.vercel.app", // Đã sửa link
    siteName: "VinhWorks",
    images: [
      {
        url: "https://res.cloudinary.com/your-cloud/image/upload/v1/your-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks Preview",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VinhWorks",
    description: "Nền tảng lập trình viên phát triển nhanh.",
    images: [
      "https://res.cloudinary.com/your-cloud/image/upload/v1/your-thumbnail.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={poppins.className}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="min-h-screen font-sans text-gray-900 bg-white">
        <NextTopLoader
          color="#8b5cf6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #8b5cf6,0 0 5px #8b5cf6"
        />

        <UserProvider>
          <AppWrapper>
            <PageTransition>{children}</PageTransition>
          </AppWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
