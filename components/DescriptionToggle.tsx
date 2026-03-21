"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function DescriptionToggle({
  description,
}: {
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 200;

  return (
    <div className="relative">
      <p
        className={`text-base leading-7 text-slate-600 font-medium transition-all ${
          !expanded && isLong ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </p>

      {/* Gradient fade khi thu gọn */}
      {!expanded && isLong && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />
      )}

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={13} /> Thu gọn
            </>
          ) : (
            <>
              <ChevronDown size={13} /> Xem thêm
            </>
          )}
        </button>
      )}
    </div>
  );
}
