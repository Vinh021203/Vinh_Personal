import Link from "next/link";
import { Home, MessageCircle, AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang | VinhWorks",
  description: "Rất tiếc, đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.",

  robots: {
    index: false,
    follow: true,
  },

  openGraph: {
    title: "Oops! Trang không tồn tại | VinhWorks",
    description: "Có vẻ như bạn đã đi lạc. Hãy quay về trang chủ để tiếp tục.",
    url: "https://vinhworks.com",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhworks.com/og-system.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/30 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-2xl p-6 mx-auto text-center">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-indigo-500/10 rounded-[3rem] p-12 md:p-16">
          {/* Icon & 404 Text */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full shadow-xl shadow-indigo-200/50 animate-bounce">
              <AlertTriangle size={40} className="text-rose-500" />
            </div>

            <h1 className="font-black tracking-tighter text-transparent text-8xl bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-black text-slate-900 md:text-3xl">
              Oops! Trang này không tồn tại.
            </h2>
            <p className="max-w-md mx-auto text-lg font-medium leading-relaxed text-slate-500">
              Có vẻ như đường dẫn bị hỏng hoặc trang đã bị xóa. Bạn có thể quay
              lại hoặc về trang chủ.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-white transition-all shadow-xl sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
            >
              <Home size={20} />
              Về trang chủ
            </Link>

            {/* Nút quay lại thông minh */}
            <BackButton />
          </div>

          {/* Link Báo Lỗi */}
          <div className="pt-8 mt-8 border-t border-slate-200/50">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors text-slate-400 hover:text-indigo-600"
            >
              <MessageCircle size={16} />
              Báo cáo sự cố đường dẫn
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute text-xs font-bold tracking-widest uppercase bottom-8 text-slate-400 opacity-60">
        VinhWorks System
      </div>
    </div>
  );
}
