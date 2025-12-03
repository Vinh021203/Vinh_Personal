"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold transition-all bg-white border-2 shadow-sm sm:w-auto text-slate-600 border-slate-100 rounded-2xl hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md hover:-translate-y-1"
    >
      <ArrowLeft size={20} />
      Quay lại
    </button>
  );
}
