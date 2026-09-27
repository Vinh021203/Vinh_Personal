"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ClipboardCheck, X } from "lucide-react";

const DISMISSED_KEY = "vinhworks-survey-dismissed";

export default function SurveyPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(DISMISSED_KEY) === "true") return;

    const timer = window.setTimeout(() => setIsOpen(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-zinc-950/60 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dismiss();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="survey-title"
            aria-describedby="survey-description"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 290, damping: 25 }}
            className="relative w-full max-w-lg border-2 border-zinc-950 bg-white p-6 shadow-[8px_8px_0_#ffb21c] sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center border border-zinc-950 bg-white text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus:outline-none focus:ring-4 focus:ring-amber-300"
              aria-label="Đóng thông báo khảo sát"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="mb-6 grid h-14 w-14 place-items-center border-2 border-zinc-950 bg-[#ffb21c] shadow-[4px_4px_0_#18181b]">
              <ClipboardCheck size={27} aria-hidden="true" />
            </div>

            <p className="mb-3 text-[11px] font-black uppercase tracking-[.2em] text-[#9a4f00]">
              VinhWorks Survey
            </p>
            <h2 id="survey-title" className="pr-10 text-3xl font-black leading-tight tracking-[-0.04em] text-zinc-950 sm:text-4xl">
              Mời bạn tham gia khảo sát
            </h2>
            <p id="survey-description" className="mt-4 max-w-md text-sm font-medium leading-6 text-zinc-600 sm:text-base">
              Ý kiến của bạn sẽ giúp mình có thêm dữ liệu cho bài đánh giá hiện tại. Cảm ơn bạn đã dành thời gian phản hồi!
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/form"
                onClick={dismiss}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 border-2 border-zinc-950 bg-[#ffb21c] px-5 py-3 text-sm font-black text-zinc-950 shadow-[4px_4px_0_#18181b] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                Mở khảo sát
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="min-h-12 border border-zinc-950 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-4 focus:ring-zinc-200"
              >
                Để sau
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
