"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${destination.pathname}${destination.search}`;
      if (current === next) return;
      setNavigating(true);
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setNavigating(false);
    setShowLoader(false);
  }, [pathname]);

  useEffect(() => {
    if (!navigating) return;
    const reveal = window.setTimeout(() => setShowLoader(true), 350);
    const safety = window.setTimeout(() => setNavigating(false), 5000);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(safety);
      setShowLoader(false);
    };
  }, [navigating]);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="pointer-events-none fixed inset-0 z-[9990]"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
            <div className="absolute inset-0 grid place-items-center px-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -5 }}
                transition={{ duration: 0.16 }}
                className="relative overflow-hidden border border-zinc-950 bg-zinc-950 px-5 py-4 text-white shadow-[5px_5px_0_#ffb21c]"
              >
                <div className="flex items-center gap-3">
                  <LoadingSpinner size="sm" />
                  <span className="whitespace-nowrap text-[9px] font-black uppercase tracking-[.2em]">Dang chuyen trang</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-white/10">
                  <motion.span
                    initial={{ x: "-100%" }}
                    animate={{ x: "220%" }}
                    transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut" }}
                    className="block h-full w-1/2 bg-[#ffb21c]"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
