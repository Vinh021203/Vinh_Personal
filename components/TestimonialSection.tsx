"use client";

import Image from "next/image";
import { Building2, Circle, Hexagon, Quote, Star, Triangle } from "lucide-react";
import { SiMongodb, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

const testimonials = [
  { id: 1, name: "Nguyễn Văn A", role: "CEO @ TechStart", content: "VinhWorks không chỉ code giỏi mà tư duy sản phẩm cực tốt. Website mới đã giúp chúng tôi tăng 200% doanh số chỉ sau một tháng vận hành.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop", companyLogo: Hexagon },
  { id: 2, name: "Sarah Tran", role: "Marketing Lead @ NextGen", content: "Giao diện UI/UX hiện đại, đúng gu thẩm mỹ quốc tế. Quy trình làm việc chuyên nghiệp, minh bạch và hỗ trợ rất nhiệt tình.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop", companyLogo: Triangle },
  { id: 3, name: "Minh Hoàng", role: "Founder @ CoffeeHouse", content: "Tốc độ tải trang cực nhanh, điểm SEO Google xanh. Rất hài lòng với kết quả nhận được và chắc chắn sẽ tiếp tục hợp tác.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop", companyLogo: Circle },
  { id: 4, name: "Jennifer Lee", role: "Product Manager @ EduMinds", content: "VinhWorks đã giúp chúng tôi xây dựng nền tảng học tập hiện đại với trải nghiệm người dùng xuất sắc. Học viên rất hài lòng!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop", companyLogo: Building2 },
  { id: 5, name: "Trần Đức Anh", role: "CTO @ VinaCorp", content: "Code chất lượng cao, kiến trúc rõ ràng và dễ bảo trì. Đây là một đối tác đáng tin cậy cho những dự án lớn.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop", companyLogo: Hexagon },
];

const technologies = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-zinc-950", tint: "bg-zinc-100" },
  { name: "React", icon: SiReact, color: "text-[#61DAFB]", tint: "bg-[#61DAFB]/10" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]", tint: "bg-[#3178C6]/10" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]", tint: "bg-[#06B6D4]/10" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]", tint: "bg-[#47A248]/10" },
  { name: "Vercel", icon: SiVercel, color: "text-zinc-950", tint: "bg-zinc-100" },
];

export const TestimonialSection = () => (
  <>
    <section className="overflow-hidden border-y border-zinc-900 bg-white py-8 md:py-10">
      <p className="mb-7 text-center text-[10px] font-black uppercase tracking-[.22em] text-zinc-500 md:text-xs">
        Bộ công nghệ đứng sau mỗi sản phẩm
      </p>
      <div className="trust-mask overflow-hidden">
        <div className="logo-marquee flex w-max items-center hover:[animation-play-state:paused]">
          {[...technologies, ...technologies].map((technology, index) => (
            <div key={`${technology.name}-${index}`} className="mx-8 flex shrink-0 items-center gap-3 text-zinc-800 md:mx-12">
              <span className={`grid h-11 w-11 place-items-center rounded-full ${technology.tint}`}>
                <technology.icon size={25} className={technology.color} aria-hidden="true" focusable="false"/>
              </span>
              <span className="text-lg font-black md:text-2xl">{technology.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="overflow-hidden bg-[#fff8e9] py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-7xl px-5 text-center lg:px-8">
        <span className="inline-block rotate-[-3deg] border border-amber-500 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-amber-700">Testimonials</span>
        <h2 className="mt-6 text-4xl font-black leading-[.95] tracking-[-.05em] text-zinc-950 md:text-6xl">
          Niềm tin từ <span className="text-[#d98200]">khách hàng thực tế</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-600">Những trải nghiệm thật trong quá trình cùng nhau xây dựng sản phẩm.</p>
      </div>

      <div className="testimonial-mask overflow-hidden py-3">
        <div className="testimonial-marquee flex w-max items-stretch hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item}/>
          ))}
        </div>
      </div>
    </section>

    <style jsx global>{`
      @keyframes logo-marquee { to { transform: translateX(-50%); } }
      @keyframes testimonial-marquee { to { transform: translateX(-50%); } }
      .logo-marquee { animation: logo-marquee 24s linear infinite; }
      .testimonial-marquee { animation: testimonial-marquee 42s linear infinite; }
      .boston-home .testimonial-card { box-shadow: 6px 6px 0 #ffb21c !important; }
      .trust-mask, .testimonial-mask { mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent); }
      @media (prefers-reduced-motion: reduce) {
        .logo-marquee, .testimonial-marquee { animation-play-state: paused; }
      }
    `}</style>
  </>
);

const TestimonialCard = ({ item }: { item: (typeof testimonials)[number] }) => (
  <article className="testimonial-card group mx-3 flex w-[310px] shrink-0 flex-col border border-zinc-900 bg-white p-6 transition-transform duration-300 hover:-translate-y-2 sm:w-[390px] md:mx-4 md:p-8">
    <div className="mb-6 flex items-start justify-between">
      <div className="flex gap-1">{Array.from({length:5}).map((_,i) => <Star key={i} size={16} className="fill-[#ffb21c] text-[#ffb21c]"/>)}</div>
      <Quote size={36} strokeWidth={1.4} className="text-amber-200"/>
    </div>
    <p className="mb-8 flex-1 text-sm leading-7 text-zinc-700 md:text-base">“{item.content}”</p>
    <div className="flex items-center gap-4 border-t border-zinc-300 pt-5">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-zinc-900 bg-amber-100">
        <Image src={item.avatar} alt={item.name} fill sizes="48px" className="object-cover"/>
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-black text-zinc-950">{item.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-zinc-500"><item.companyLogo size={13} className="text-[#d98200]"/>{item.role}</p>
      </div>
    </div>
  </article>
);
