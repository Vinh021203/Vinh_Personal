import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { connectDB } from "@/libs/mongodb";
import Post from "@/models/Post";
import {
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Eye,
  ChevronRight,
  MessageCircle,
  TrendingUp,
  Share2,
  Heart,
  BookmarkPlus,
  Copy,
  Hash,
} from "lucide-react";
import { BlogDetailClient, CommentButton } from "@/components/BlogDetailClient";
import DescriptionToggle from "@/components/DescriptionToggle";

// ── generateMetadata ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug: decodeURIComponent(slug) }).lean();
  if (!post) return {};
  const desc = (post as any).description || post.content?.slice(0, 150) || "";
  return {
    title: `${post.title} | VinhWorks`,
    description: desc,
    openGraph: {
      title: `${post.title} | VinhWorks`,
      description: desc,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
      url: `https://vinhworks.com/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | VinhWorks`,
      description: desc,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectDB();
  const post = await Post.findOne({ slug: decodeURIComponent(slug) }).lean();
  if (!post) return notFound();

  const relatedPosts = await Post.find({ slug: { $ne: post.slug } })
    .limit(3)
    .lean();

  const encodedUrl = encodeURIComponent(
    `https://vinhworks.com/blog/${post.slug}`,
  );
  const encodedTitle = encodeURIComponent(post.title);

  const postData = {
    ...post,
    readTime: "5 phút đọc",
    views: Math.floor(Math.random() * 1000) + 100,
    author: (post as any).author || "VinhWorks",
    category: (post as any).category || "Web Development",
    tags: (post as any).tags || [],
    description: (post as any).description || "",
    displayDate:
      (post as any).createdAt || (post as any).date || new Date().toISOString(),
  };

  return (
    <>
      {/* ── STICKY NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/blog">
            <button className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-violet-50 hover:text-violet-700 rounded-full transition-all">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              Quay lại Blog
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <button
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Yêu thích"
            >
              <Heart size={18} />
            </button>
            <button
              className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
              title="Lưu bài viết"
            >
              <BookmarkPlus size={18} />
            </button>
            <div className="w-px h-5 bg-slate-200 mx-1" />
            <BlogDetailClient
              postSlug={(postData as any).slug}
              postTitle={postData.title as string}
            />
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* ══════════════════════════════════════════
              HERO — LEFT (title + thumbnail + meta) | RIGHT (sidebar)
          ══════════════════════════════════════════ */}
          <div className="grid gap-8 lg:grid-cols-3 mb-10 items-start">
            {/* ── LEFT ── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <Link
                  href="/"
                  className="hover:text-violet-600 transition-colors"
                >
                  Home
                </Link>
                <ChevronRight size={12} />
                <Link
                  href="/blog"
                  className="hover:text-violet-600 transition-colors"
                >
                  Blog
                </Link>
                <ChevronRight size={12} />
                <span className="text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md font-bold">
                  {postData.category}
                </span>
              </nav>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                {postData.title as string}
              </h1>

              {/* Description */}
              {postData.description && (
                <DescriptionToggle
                  description={postData.description as string}
                />
              )}

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-violet-500" />
                  <strong className="text-slate-800">
                    {postData.author as string}
                  </strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-blue-500" />
                  {new Date(postData.displayDate).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-pink-500" />
                  {postData.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={14} className="text-amber-500" />
                  {postData.views} lượt xem
                </span>
              </div>

              {/* Tags */}
              {postData.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Hash size={14} className="text-slate-400" />
                  {postData.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-bold bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ── FEATURED IMAGE trong hero ── */}
              {postData.thumbnail && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-md group mt-2">
                  <Image
                    src={postData.thumbnail as string}
                    alt={postData.title as string}
                    width={900}
                    height={500}
                    className="object-cover w-full aspect-[16/9] group-hover:scale-[1.02] transition-transform duration-700"
                    priority
                  />
                </div>
              )}
            </div>

            {/* ── RIGHT: Sidebar sticky ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Info card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                    Thông tin bài viết
                  </h3>
                  {[
                    {
                      label: "Tác giả",
                      value: postData.author as string,
                      icon: <User size={13} className="text-violet-400" />,
                    },
                    {
                      label: "Ngày đăng",
                      value: new Date(postData.displayDate).toLocaleDateString(
                        "vi-VN",
                      ),
                      icon: <Calendar size={13} className="text-blue-400" />,
                    },
                    {
                      label: "Danh mục",
                      value: postData.category,
                      icon: <Tag size={13} className="text-fuchsia-400" />,
                    },
                    {
                      label: "Đọc trong",
                      value: postData.readTime,
                      icon: <Clock size={13} className="text-pink-400" />,
                    },
                    {
                      label: "Lượt xem",
                      value: `${postData.views}`,
                      icon: <Eye size={13} className="text-amber-400" />,
                    },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                    >
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
                        {icon}
                        {label}
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Author card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-lg font-black">
                      {(postData.author as string).charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-sm">
                        {postData.author as string}
                      </p>
                      <p className="text-[10px] text-violet-200 uppercase tracking-wider">
                        Author
                      </p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-violet-100 relative z-10">
                    Full-stack Developer đam mê chia sẻ kiến thức về Web
                    Development, UI/UX và công nghệ mới nhất.
                  </p>
                </div>

                {/* Share card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                    <Share2 size={13} className="text-violet-500" /> Chia sẻ
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center p-3 bg-sky-50 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <Linkedin size={18} />
                    </a>
                    <button className="flex-1 flex items-center justify-center p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-700 hover:text-white transition-all">
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* ══════════════════════════════════════════
              CONTENT + SIDEBAR RIGHT (Related + Share)
          ══════════════════════════════════════════ */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* ── CONTENT ── */}
            <div className="lg:col-span-2 space-y-8">
              {/* Article body */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8 md:p-12">
                <div
                  className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                  prose-p:text-slate-700 prose-p:leading-8 prose-p:font-medium
                  prose-li:text-slate-700 prose-li:font-medium
                  prose-strong:text-slate-900 prose-strong:font-extrabold
                  prose-a:text-violet-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-violet-700
                  prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:border-slate-100
                  prose-code:text-violet-700 prose-code:bg-violet-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-semibold prose-code:text-sm
                  prose-pre:bg-slate-900 prose-pre:shadow-xl prose-pre:rounded-2xl prose-pre:text-sm
                  prose-blockquote:border-l-4 prose-blockquote:border-violet-400 prose-blockquote:bg-violet-50/60 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700
                  prose-table:text-sm prose-th:bg-slate-50 prose-th:font-black
                  prose-hr:border-slate-100
                "
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {postData.content as string}
                  </ReactMarkdown>
                </div>

                {/* Tags footer */}
                {postData.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-8 mt-10 border-t border-slate-100">
                    <Tag size={16} className="text-slate-400 mr-1" />
                    {postData.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-full hover:bg-violet-100 hover:text-violet-700 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Author full card */}
              <div className="relative flex items-center gap-6 p-8 overflow-hidden text-white bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl shadow-xl">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                <div className="w-20 h-20 shrink-0 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl font-black">
                  {(postData.author as string).charAt(0)}
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-bold text-violet-200 uppercase tracking-widest mb-1">
                    Tác giả
                  </p>
                  <h3 className="text-xl font-black mb-2">
                    {postData.author as string}
                  </h3>
                  <p className="text-sm leading-relaxed text-violet-100 max-w-md">
                    Full-stack Developer đam mê chia sẻ kiến thức về Web
                    Development, UI/UX và công nghệ mới nhất. Theo dõi để cập
                    nhật thêm!
                  </p>
                </div>
              </div>

              {/* CTA / Comment */}
              <div className="relative overflow-hidden bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-violet-50 rounded-2xl">
                  <MessageCircle className="text-violet-600" size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Thảo luận & Góp ý
                </h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                  Bạn thấy bài viết này hữu ích? Hãy để lại bình luận hoặc chia
                  sẻ ý kiến để cộng đồng cùng phát triển nhé!
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  <CommentButton />
                  <Link href="/blog">
                    <button className="px-7 py-3 text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-violet-200 hover:text-violet-600 hover:shadow-md transition-all">
                      Xem thêm bài viết
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── SIDEBAR RIGHT ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="flex items-center gap-2 text-sm font-black text-slate-800">
                        <TrendingUp size={15} className="text-violet-500" />
                        Bài viết liên quan
                      </h3>
                      <Link
                        href="/blog"
                        className="text-xs font-bold text-violet-600 hover:text-violet-700"
                      >
                        Xem tất cả →
                      </Link>
                    </div>
                    <div className="space-y-1">
                      {relatedPosts.map((related: any) => (
                        <Link
                          key={related._id}
                          href={`/blog/${related.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-3 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            {related.thumbnail && (
                              <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                                <Image
                                  src={related.thumbnail}
                                  alt={related.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-violet-600 transition-colors leading-snug">
                                {related.title}
                              </h4>
                              <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 font-medium">
                                <Clock size={10} />
                                <span>{related.readTime || "5 phút đọc"}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick share dark */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                    Chia sẻ bài viết
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      target="_blank"
                      className="flex-1 flex justify-center p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition-all"
                    >
                      <Facebook size={17} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                      target="_blank"
                      className="flex-1 flex justify-center p-3 bg-white/10 hover:bg-sky-500 rounded-xl transition-all"
                    >
                      <Twitter size={17} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                      target="_blank"
                      className="flex-1 flex justify-center p-3 bg-white/10 hover:bg-indigo-600 rounded-xl transition-all"
                    >
                      <Linkedin size={17} />
                    </a>
                    <button className="flex-1 flex justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Copy size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
