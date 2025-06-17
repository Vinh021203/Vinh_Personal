"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rss,
  ArrowRight,
  Tag,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  Grid3X3,
  List,
  BookOpen,
  TrendingUp,
  Star,
  Eye,
  MessageCircle,
  Share2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

const POSTS_PER_PAGE = 6;

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  tags: string[];
  createdAt: string;
  author: string;
  readTime: string;
  views: number;
  featured: boolean;
  category: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const categories = ["all", "web-development", "ui-ux", "seo", "technology"];
  const categoryLabels: Record<string, string> = {
    all: "Tất cả",
    "web-development": "Web Development",
    "ui-ux": "UI/UX Design",
    seo: "SEO & Marketing",
    technology: "Công nghệ",
  };

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        const transformed = data.map((post: any, index: number) => ({
          title: post.title,
          excerpt:
            post.content?.slice(0, 150) + "..." || "Nội dung bài viết...",
          slug: post.slug,
          image: post.thumbnail || "/placeholder.jpg",
          tags: post.tags || ["Web Development"],
          createdAt: post.createdAt || new Date().toISOString(),
          author: post.author || "VinhWorks",
          readTime: "5 phút đọc",
          views: Math.floor(Math.random() * 1000) + 100,
          featured: index < 2,
          category: post.category || "web-development",
        }));
        setPosts(transformed);
        setFilteredPosts(transformed);
      } catch (err) {
        toast.error("Không thể tải dữ liệu bài viết!");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, searchTerm, selectedCategory]);

  // Pre-generate particle positions
  const particlePositions = [
    { left: 10, top: 20 },
    { left: 80, top: 30 },
    { left: 15, top: 70 },
    { left: 90, top: 60 },
    { left: 45, top: 15 },
    { left: 70, top: 85 },
    { left: 25, top: 40 },
    { left: 85, top: 75 },
  ];

  const stats = [
    {
      icon: BookOpen,
      label: "Tổng bài viết",
      value: posts.length,
      color: "text-purple-400",
    },
    { icon: Eye, label: "Lượt xem", value: "50K+", color: "text-blue-400" },
    { icon: User, label: "Độc giả", value: "10K+", color: "text-indigo-400" },
    {
      icon: TrendingUp,
      label: "Tăng trưởng",
      value: "+25%",
      color: "text-pink-400",
    },
  ];

  return (
    <div>
      <Head>
        <title>Blog & Tin tức | VinhWorks</title>
        <meta
          name="description"
          content="Cập nhật kiến thức lập trình web, xu hướng công nghệ, và hướng dẫn SEO chuẩn hiện đại từ VinhWorks."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Blog & Tin tức | VinhWorks" />
        <meta
          property="og:description"
          content="Chia sẻ kiến thức lập trình, thiết kế web, tối ưu hiệu suất, và SEO từ VinhWorks."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinhworks.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Enhanced Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 rounded-full border-purple-500/30"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <motion.p
                className="mt-6 text-lg font-medium text-purple-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Đang tải blog...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CSS for grid animation */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>

      <section
        className={`relative min-h-screen px-4 py-20 pt-32 md:pt-28 lg:pt-24 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 transition-all duration-500 ${
          loading
            ? "blur-sm pointer-events-none select-none opacity-30"
            : "opacity-100"
        }`}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute rounded-full w-96 h-96 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
              left: `${mousePosition.x * 0.02}px`,
              top: `${mousePosition.y * 0.02}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute rounded-full w-80 h-80 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              right: `${mousePosition.x * 0.015}px`,
              bottom: `${mousePosition.y * 0.015}px`,
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating Tech Elements */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden">
            {particlePositions.map((position, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-purple-400/20" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center md:mb-20"
          >
            {/* Header Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Rss className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Blog & Kiến thức
              </span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text">
              Kiến thức & Xu hướng 📚
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 md:text-xl">
              Chia sẻ kinh nghiệm lập trình web, thiết kế UI/UX, SEO và những xu
              hướng công nghệ mới nhất.
              <br />
              <span className="font-medium text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                Cập nhật liên tục để bạn luôn dẫn đầu!
              </span>
            </p>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 mb-16 md:grid-cols-4"
          >
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 text-center transition-all duration-300 border rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-purple-400/40"
                >
                  <IconComponent
                    className={`w-8 h-8 ${stat.color} mx-auto mb-3`}
                  />
                  <div className="mb-1 text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col items-center justify-between gap-6 p-6 border md:flex-row rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute text-purple-400 transform -translate-y-1/2 left-4 top-1/2"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-purple-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 text-white transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-slate-800"
                    >
                      {categoryLabels[category]}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 border bg-slate-700/50 rounded-2xl border-purple-500/30">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-purple-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-purple-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-center">
              <p className="text-gray-400">
                Hiển thị{" "}
                <span className="font-semibold text-purple-400">
                  {filteredPosts.length}
                </span>{" "}
                bài viết
                {searchTerm && (
                  <span>
                    {" "}
                    cho từ khóa "
                    <span className="text-blue-400">{searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Enhanced Blog Posts Grid */}
          {filteredPosts.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <Search className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Không tìm thấy bài viết
              </h3>
              <p className="mb-6 text-gray-400">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600"
              >
                Xem tất cả bài viết
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`grid gap-8 mb-16 ${
                viewMode === "grid"
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {paginatedPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`group relative overflow-hidden rounded-3xl border border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-slate-800/30 to-slate-900/30 hover:border-purple-400/40 transition-all duration-300 shadow-2xl ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    }`}
                  >
                    {/* Featured Badge */}
                    {post.featured && (
                      <div className="absolute z-10 flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-300 border rounded-full top-4 left-4 bg-yellow-500/20 border-yellow-500/30">
                        <Star className="w-3 h-3" />
                        Nổi bật
                      </div>
                    )}

                    {/* Post Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "md:w-1/3" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={post.image}
                        alt={`Ảnh đại diện cho bài viết: ${post.title}`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

                      {/* Category Badge */}
                      <div className="absolute px-3 py-1 text-xs font-medium text-white rounded-full top-4 right-4 bg-purple-500/80 backdrop-blur-sm">
                        {categoryLabels[post.category] || "Blog"}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div
                      className={`p-6 md:p-8 ${
                        viewMode === "list"
                          ? "md:w-2/3 flex flex-col justify-center"
                          : ""
                      }`}
                    >
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 text-xl font-bold text-white transition-all md:text-2xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mb-4 text-sm leading-relaxed text-gray-300 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>
                              {new Date(post.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{post.views}</span>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Link href={`/blog/${post.slug}`}>
                        <button className="flex items-center gap-2 px-4 py-2 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 group/btn">
                          <BookOpen size={16} />
                          <span>Đọc thêm</span>
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-2 mb-16"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                      : "border border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="relative p-8 border md:p-12 rounded-3xl border-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                📬 Đăng ký nhận bài viết mới
              </h3>
              <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                Nhận thông báo khi có bài viết mới về công nghệ, lập trình và
                thiết kế web
              </p>

              <div className="flex flex-col justify-center max-w-md gap-4 mx-auto sm:flex-row">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 border bg-slate-700/50 border-purple-500/30 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-purple-400/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600"
                >
                  Đăng ký
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
