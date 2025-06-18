"use client";

import Image from "next/image";
import { User as UserIcon } from "lucide-react";

interface AvatarProps {
  size?: number;
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

export default function Avatar({
  size = 32,
  src,
  alt = "Avatar",
  name = "User",
  className = "",
}: AvatarProps) {
  const isValidUrl = src && (src.startsWith("http") || src.startsWith("/"));

  // Extract initial from name
  const initial = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`relative rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {isValidUrl ? (
        <>
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            unoptimized
            onError={(e) => {
              // Hide image and show fallback
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.parentElement?.querySelector(
                ".fallback-initial"
              ) as HTMLElement;
              if (fallback) {
                fallback.style.display = "flex";
              }
            }}
          />
          {/* Fallback initial if image fails to load */}
          <div
            className="absolute inset-0 flex items-center justify-center font-bold text-white fallback-initial bg-gradient-to-r from-purple-500 to-blue-500"
            style={{
              display: "none",
              fontSize: `${size * 0.4}px`,
            }}
          >
            {initial}
          </div>
        </>
      ) : (
        <span
          className="flex items-center justify-center w-full h-full"
          style={{ fontSize: `${size * 0.4}px` }}
        >
          {initial}
        </span>
      )}
    </div>
  );
}
