"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  Search,
  Grid3X3,
  List,
  Mail,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Tag,
  Rss,
  ArrowRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const POSTS_PER_PAGE = 6;

interface BlogPost {
  _id: string;
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

// --- SUB-COMPONENT: BlogCard ---
const BlogCard = ({
  post,
  viewMode,
}: {
  post: BlogPost;
  viewMode: "grid" | "list";
}) => {
  const isList = viewMode === "list";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseMove={handleMouseMove}
      className={`group relative h-full ${isList ? "md:col-span-2" : ""}`}
    >
      {/* Animated Gradient Border Background */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-sm transition duration-500 group-hover:duration-200" />

      {/* Main Card Content */}
      <div
        className={`relative h-full bg-white rounded-[2rem] border border-slate-100 overflow-hidden flex ${
          isList ? "flex-col md:flex-row" : "flex-col"
        }`}
      >
        {/* Spotlight Effect */}
        <motion.div
          className="absolute z-10 transition duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(139, 92, 246, 0.05),
                transparent 80%
              )
            `,
          }}
        />

        {/* Image Section */}
        <div
          className={`relative overflow-hidden ${
            isList ? "md:w-2/5 h-64 md:h-auto" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={post.image || "/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 transition-opacity bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40" />

          {/* Badge */}
          <div className="absolute z-20 top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
              {post.category}
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div
          className={`relative z-20 p-6 flex flex-col ${
            isList ? "md:w-3/5 justify-center" : ""
          }`}
        >
          <div className="flex items-center gap-3 mb-3 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar size={12} />{" "}
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>

          <h3 className="mb-3 text-xl font-bold transition-all duration-300 text-slate-900 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="flex-grow mb-4 text-sm font-medium leading-relaxed text-slate-500 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-500 bg-slate-100 rounded-lg group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors"
              >
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100 group-hover:border-slate-200/50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
                {post.author.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-600">
                {post.author}
              </span>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-xs font-bold transition-all text-slate-400 group-hover:text-violet-600 group-hover:gap-2"
            >
              Đọc tiếp <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "web-development", label: "Lập trình Web" },
    { id: "ui-ux", label: "Thiết kế UI/UX" },
    { id: "seo", label: "Marketing & SEO" },
    { id: "technology", label: "Công nghệ" },
  ];

  useEffect(() => {
    setMounted(true);
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        const transformedPosts: BlogPost[] = data.map((post: any) => ({
          _id: post._id,
          id: post._id,
          title: post.title,
          excerpt:
            post.excerpt ||
            post.content?.replace(/<[^>]+>/g, "").slice(0, 120) + "..." ||
            "Chưa có tóm tắt",
          slug: post.slug,
          image:
            post.thumbnail ||
            post.image ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
          tags: post.tags || [],
          createdAt: post.createdAt,
          author: post.author?.name || post.author || "Admin",
          readTime: post.readTime || "5 phút",
          views: post.views || 0,
          featured: post.featured || false,
          category: post.category || "technology",
        }));

        setPosts(transformedPosts);
        setFilteredPosts(transformedPosts);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let result = posts;

    if (selectedCategory !== "all") {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerTerm) ||
          p.excerpt.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredPosts(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, posts]);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  if (!mounted) return null;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 origin-left z-[100]"
      />

      <main className="min-h-screen overflow-hidden font-sans bg-slate-50 text-slate-900 selection:bg-violet-200 selection:text-violet-900">
        {/* ================= HERO HEADER ================= */}
        <section className="relative pt-32 pb-12 overflow-hidden lg:pt-40 lg:pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-fuchsia-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          </div>

          <div className="container relative z-10 max-w-5xl px-6 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-bold border border-white rounded-full shadow-sm bg-white/80 backdrop-blur-md text-violet-600 ring-1 ring-violet-100">
                <Rss size={16} className="fill-violet-500" />
                <span>Blog & News</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Kiến thức &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
                  Xu hướng
                </span>
              </h1>

              <p className="max-w-2xl mx-auto mb-12 text-xl font-medium leading-relaxed text-slate-600">
                Khám phá kho tàng kiến thức về lập trình, thiết kế và công nghệ
                được cập nhật liên tục mỗi ngày.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= CONTENT AREA ================= */}
        <section className="py-12 pb-24">
          <div className="container px-6 mx-auto max-w-7xl">
            {/* Sticky Toolbar */}
            <div className="sticky z-30 mb-12 top-20">
              <div className="flex flex-col items-center justify-between gap-4 p-4 border shadow-lg bg-white/80 backdrop-blur-xl rounded-2xl border-white/50 shadow-slate-200/50 lg:flex-row">
                {/* Search */}
                <div className="relative w-full lg:w-96 group">
                  <Search
                    className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-violet-600"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 text-sm font-medium transition-all border outline-none bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700 placeholder:text-slate-400"
                  />
                </div>

                {/* Filter & View */}
                <div className="flex items-center w-full gap-4 pb-2 overflow-x-auto lg:w-auto lg:pb-0 no-scrollbar">
                  <div className="flex p-1 border bg-slate-100/50 rounded-xl border-slate-200">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                          selectedCategory === cat.id
                            ? "bg-white text-violet-600 shadow-sm"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex p-1 border bg-slate-100/50 rounded-xl border-slate-200 shrink-0">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-white text-violet-600 shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Grid3X3 size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-white text-violet-600 shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[2rem] h-96 animate-pulse border border-slate-100 shadow-sm"
                  />
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 max-w-4xl mx-auto"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {paginatedPosts.map((post) => (
                    <BlogCard key={post._id} post={post} viewMode={viewMode} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Không tìm thấy bài viết nào
                </h3>
                <p className="mt-2 text-slate-500">
                  Hãy thử tìm kiếm với từ khóa khác xem sao.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-2 mt-6 font-bold text-white transition-colors rounded-full bg-slate-900 hover:bg-slate-800"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 transition-all bg-white border shadow-sm rounded-xl border-slate-200 text-slate-500 hover:bg-white hover:border-violet-200 hover:text-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-11 h-11 rounded-xl font-bold text-sm transition-all shadow-sm border ${
                      currentPage === i + 1
                        ? "bg-violet-600 text-white border-violet-600 shadow-violet-500/30"
                        : "bg-white text-slate-600 border-slate-200 hover:border-violet-200 hover:text-violet-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-3 transition-all bg-white border shadow-sm rounded-xl border-slate-200 text-slate-500 hover:bg-white hover:border-violet-200 hover:text-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="relative py-24 overflow-hidden">
          <div className="container relative z-10 px-6 mx-auto max-w-7xl">
            <div className="relative overflow-hidden text-center bg-white border shadow-2xl rounded-[3rem] p-12 md:p-20 border-slate-100">
              {/* Abstract Glows */}
              <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-100/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex p-4 mb-8 bg-white border shadow-sm rounded-2xl border-slate-100 text-violet-600">
                  <Mail size={32} />
                </div>

                <h2 className="mb-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">
                  Đừng bỏ lỡ <br />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    Kiến thức mới
                  </span>
                </h2>

                <p className="mb-10 text-lg font-medium text-slate-500">
                  Đăng ký nhận bản tin hàng tuần để cập nhật những bài viết,
                  tutorial và tài nguyên miễn phí chất lượng nhất.
                </p>

                <form
                  className="flex flex-col gap-4 sm:flex-row"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Địa chỉ email của bạn"
                    className="flex-1 px-6 py-4 transition-all bg-white border-2 shadow-sm outline-none text-slate-900 rounded-2xl border-slate-200 placeholder:text-slate-400 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-4 font-bold text-white transition-all shadow-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl hover:shadow-violet-500/30"
                  >
                    Đăng ký ngay
                  </motion.button>
                </form>

                <p className="mt-6 text-xs font-medium text-slate-400">
                  Cam kết không spam. Hủy đăng ký bất cứ lúc nào.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
