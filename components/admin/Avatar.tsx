'use client';

interface AvatarProps {
  size?: number;
  src?: string;
}

export default function Avatar({ size = 32, src }: AvatarProps) {
  return (
    <div
      className={`rounded-full bg-teal-500 text-white flex items-center justify-center font-bold shadow-md`}
      style={{ width: size, height: size }}
    >
      N
    </div>
  );
}
