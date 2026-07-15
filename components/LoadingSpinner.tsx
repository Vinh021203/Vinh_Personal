type LoadingSpinnerProps = {
  label?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
};

const sizes = { sm: "h-4 w-4", md: "h-10 w-10", lg: "h-14 w-14" };

export default function LoadingSpinner({ label, size = "md", fullScreen = false, className = "" }: LoadingSpinnerProps) {
  const content = (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 48 48" aria-hidden="true" className={`${sizes[size]} animate-spin`}>
        <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="4" className="text-zinc-900/15" />
        <path d="M24 5a19 19 0 0 1 19 19" fill="none" stroke="#d98200" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="5" r="3" fill="#ffb21c" />
      </svg>
      {label && <span className="mt-4 text-center text-[9px] font-black uppercase tracking-[.2em] text-zinc-800">{label}</span>}
      <span className="sr-only">{label || "Đang tải"}</span>
    </div>
  );

  if (fullScreen) return <div className="fixed inset-0 z-[110] grid min-h-[100dvh] place-items-center bg-[#fff8e9]">{content}</div>;
  return content;
}
