import Link from "next/link";
import { ArrowRight, Home, MessageCircle, SearchX, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang | VinhWorks",
  description: "Rất tiếc, đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "404 - Không tìm thấy trang | VinhWorks",
    description: "Có vẻ như bạn đã đi lạc. Hãy quay về trang chủ để tiếp tục.",
    url: "https://vinhwork.io.vn",
    siteName: "VinhWorks",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://vinhwork.io.vn/vinhworks-og-dark-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "VinhWorks Not Found",
      },
    ],
  },
};

const suggestions = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/services" },
  { label: "Dự án", href: "/projects" },
  { label: "Liên hệ", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden border-y border-zinc-950 bg-[#fff8e9] text-zinc-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(24,24,27,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-[#ffb21c]/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-96 w-96 rounded-full bg-white/80 blur-3xl" />

      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <span className="inline-flex -rotate-2 items-center gap-2 border border-zinc-950 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] shadow-[3px_3px_0_#ffb21c]">
            <Sparkles size={14} className="text-[#d98200]" />
            Lost in VinhWorks
          </span>

          <h1 className="mt-8 max-w-3xl text-[clamp(4.8rem,17vw,12rem)] font-black leading-[.76] tracking-[-.09em]">
            404<span className="text-[#d98200]">.</span>
          </h1>

          <h2 className="mt-8 max-w-2xl text-[clamp(2.4rem,6vw,5.7rem)] font-black leading-[.82] tracking-[-.07em]">
            Trang này <span className="text-[#d98200]">đi lạc</span> rồi.
          </h2>

          <p className="mt-7 max-w-xl text-base font-medium leading-8 text-slate-600 md:text-lg">
            Đường dẫn có thể đã thay đổi, bị xoá hoặc bạn vừa gõ nhầm một chút. Không sao, mình đưa bạn về đúng luồng ngay.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex min-h-14 items-center justify-center gap-4 border border-zinc-950 bg-[#ffb21c] px-7 py-4 text-[11px] font-black uppercase tracking-[.12em] shadow-[5px_5px_0_#18181b] transition-transform hover:-translate-y-1"
            >
              <Home size={18} />
              Về trang chủ
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <BackButton />
          </div>
        </div>

        <div className="relative">
          <div className="border border-zinc-950 bg-white shadow-[10px_10px_0_#ffb21c]">
            <div className="flex items-center justify-between border-b border-zinc-950 bg-zinc-950 px-5 py-4 text-white">
              <span className="text-[10px] font-black uppercase tracking-[.22em] text-[#ffb21c]">Route not found</span>
              <span className="border border-white/20 px-3 py-1 text-[10px] font-black">HTTP 404</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid min-h-56 place-items-center border border-dashed border-zinc-300 bg-[#fff8e9] p-8 text-center">
                <div>
                  <span className="mx-auto grid h-20 w-20 place-items-center border border-zinc-950 bg-[#ffb21c] shadow-[5px_5px_0_#18181b]">
                    <SearchX size={36} />
                  </span>
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[.2em] text-slate-500">Không tìm thấy tài nguyên</p>
                  <p className="mt-3 text-2xl font-black tracking-[-.04em] md:text-3xl">Bạn muốn đi đâu tiếp?</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {suggestions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between border border-zinc-950 bg-white px-4 py-4 text-[10px] font-black uppercase tracking-[.12em] transition-colors hover:bg-zinc-950 hover:text-white"
                  >
                    {item.label}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-6 flex items-center justify-between border border-zinc-950 bg-[#fff8e9] px-5 py-4 text-[11px] font-black uppercase tracking-[.12em] transition-colors hover:bg-[#ffb21c]"
              >
                <span className="inline-flex items-center gap-3">
                  <MessageCircle size={17} />
                  Báo lỗi đường dẫn
                </span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
