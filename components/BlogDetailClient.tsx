"use client";

import { useState } from "react";
import { Copy, Heart, Bookmark, Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface BlogDetailClientProps {
  postSlug: string;
  postTitle: string;
}

export function BlogDetailClient({
  postSlug,
  postTitle,
}: BlogDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://vinhworks.com/blog/${postSlug}`);
    toast.success("Đã sao chép link!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: `https://vinhworks.com/blog/${postSlug}`,
        });
      } catch (error) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      {/* Navigation Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="p-3 text-purple-400 transition-all duration-300 border bg-purple-500/20 border-purple-500/30 rounded-xl hover:bg-purple-500/30 hover-glow"
        >
          <Share2 size={20} />
        </button>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-3 border rounded-xl transition-all duration-300 hover-glow ${
            isLiked
              ? "bg-red-500/20 border-red-500/30 text-red-400"
              : "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
          }`}
        >
          <Heart size={20} className={isLiked ? "fill-current" : ""} />
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-3 border rounded-xl transition-all duration-300 hover-glow ${
            isBookmarked
              ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
              : "bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
          }`}
        >
          <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
        </button>
      </div>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center gap-2 px-4 py-3 btn-outline hover-lift"
      >
        <Copy size={20} />
        <span className="font-medium">Copy Link</span>
      </button>
    </>
  );
}

// Comment Button Component
export function CommentButton() {
  const handleComment = () => {
    toast.success("Tính năng comment sẽ được thêm sớm!");
  };

  return (
    <button
      onClick={handleComment}
      className="px-8 py-4 btn-gradient hover-lift"
    >
      <span>Để lại bình luận</span>
    </button>
  );
}
