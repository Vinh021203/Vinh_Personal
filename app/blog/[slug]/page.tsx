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
} from "lucide-react";
import { BlogDetailClient, CommentButton } from "@/components/BlogDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug: decodeURIComponent(slug) }).lean();
  if (!post) return {};
  return {
    title: `${post.title} | VinhWorks`,
    description: post.content?.slice(0, 150) || "",
    openGraph: {
      title: `${post.title} | VinhWorks`,
      description: post.content?.slice(0, 150) || "",
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
      url: `https://vinhworks.com/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | VinhWorks`,
      description: post.content?.slice(0, 150) || "",
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

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
    `https://vinhworks.com/blog/${post.slug}`
  );
  const encodedTitle = encodeURIComponent(post.title);

  // Enhanced Data Mapping
  const postData = {
    ...post,
    readTime: "5 phút đọc",
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 50) + 10,
    author: "VinhWorks",
    category: "Web Development",
    tags: (post as any).tags || ["React", "Next.js", "TypeScript"],
    displayDate:
      (post as any).createdAt || (post as any).date || new Date().toISOString(),
  };

  return (
    <>
      {/* --- FIXED NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all border-b bg-white/90 backdrop-blur-xl border-slate-200/60">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Link href="/blog" className="group">
            <button className="flex items-center gap-2 px-4 py-2 transition-all rounded-full text-slate-600 hover:text-violet-700 hover:bg-violet-50">
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="text-sm font-bold">Quay lại Blog</span>
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <button
              className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Yêu thích"
            >
              <Heart size={20} />
            </button>
            <button
              className="p-2.5 text-slate-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
              title="Lưu bài viết"
            >
              <BookmarkPlus size={20} />
            </button>
            <div className="w-px h-6 mx-1 bg-slate-200" />
            <BlogDetailClient
              postSlug={postData.slug}
              postTitle={postData.title}
            />
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#FAFAFA] pt-24 pb-24 relative selection:bg-violet-200 selection:text-violet-900">
        {/* Background Decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1000px] h-[600px] bg-violet-200/30 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute top-20 right-0 w-[800px] h-[600px] bg-cyan-200/30 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>

        <article className="container relative z-10 max-w-4xl px-4 mx-auto">
          {/* --- HEADER SECTION --- */}
          <header className="mb-10 text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 mb-8 text-sm font-medium text-slate-500">
              <Link
                href="/"
                className="transition-colors hover:text-violet-600"
              >
                Home
              </Link>
              <ChevronRight size={14} />
              <Link
                href="/blog"
                className="transition-colors hover:text-violet-600"
              >
                Blog
              </Link>
              <ChevronRight size={14} />
              <span className="text-violet-600 font-bold bg-violet-50 px-2 py-0.5 rounded-md">
                {postData.category}
              </span>
            </nav>

            {/* Title */}
            <h1 className="mb-8 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl text-slate-900">
              {postData.title}
            </h1>

            {/* Author & Meta Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 bg-white border rounded-full shadow-sm md:gap-8 border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shrink-0">
                  {postData.author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold leading-none text-slate-900">
                    {postData.author}
                  </p>
                </div>
              </div>
              <div className="hidden w-px h-4 bg-slate-200 md:block" />
              <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-violet-500" />
                  {new Date(postData.displayDate).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-pink-500" />
                  {postData.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye size={16} className="text-amber-500" />
                  {postData.views}
                </span>
              </div>
            </div>
          </header>

          {/* --- FEATURED IMAGE --- */}
          {postData.thumbnail && (
            <div className="relative mb-12 group">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white">
                <Image
                  src={postData.thumbnail}
                  alt={postData.title}
                  width={1200}
                  height={630}
                  className="object-cover w-full h-auto aspect-[16/9] transform transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          )}

          {/* --- MAIN CONTENT --- */}
          <div className="relative mb-12">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 lg:p-16">
              {/* Typography Setup */}
              <div
                className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                    prose-p:text-slate-800 prose-p:leading-8 prose-p:font-medium
                    prose-li:text-slate-800 prose-li:font-medium
                    prose-strong:text-slate-900 prose-strong:font-extrabold
                    prose-a:text-violet-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-violet-700
                    prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-slate-100
                    prose-code:text-violet-700 prose-code:bg-violet-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-semibold
                    prose-pre:bg-slate-900 prose-pre:shadow-lg prose-pre:rounded-2xl
                    prose-blockquote:border-l-violet-500 prose-blockquote:bg-violet-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-700
                "
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {postData.content}
                </ReactMarkdown>
              </div>

              {/* Tags Footer */}
              {postData.tags && postData.tags.length > 0 && (
                <div className="pt-8 mt-12 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag size={18} className="mr-2 text-slate-400" />
                    {postData.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-full hover:bg-violet-100 hover:text-violet-700 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- SHARE & AUTHOR --- */}
          <div className="grid gap-8 mb-20 md:grid-cols-3">
            {/* Share Card */}
            <div className="flex flex-col justify-center h-full p-6 bg-white border shadow-lg md:col-span-1 rounded-3xl border-slate-100 shadow-slate-200/50">
              <h3 className="flex items-center gap-2 mb-4 font-bold text-slate-900">
                <Share2 size={20} className="text-violet-600" /> Chia sẻ ngay
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  className="p-3 text-blue-600 transition-all bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  className="p-3 transition-all bg-sky-50 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  className="p-3 text-indigo-700 transition-all bg-indigo-50 rounded-xl hover:bg-indigo-700 hover:text-white"
                >
                  <Linkedin size={20} />
                </a>
                {/* Copy Button Logic Placeholder */}
                <button className="p-3 transition-all bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-600 hover:text-white">
                  <Copy size={20} />
                </button>
              </div>
            </div>

            {/* Author Card */}
            <div className="relative flex items-center gap-6 p-8 overflow-hidden text-white shadow-xl md:col-span-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full bg-white/10 blur-2xl" />
              <div className="flex items-center justify-center w-20 h-20 border-2 rounded-full shadow-inner bg-white/20 backdrop-blur-sm border-white/30 shrink-0">
                <span className="text-3xl font-bold">
                  {postData.author.charAt(0)}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="mb-2 text-xl font-bold">
                  Viết bởi {postData.author}
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-violet-100 opacity-90">
                  Full-stack Developer đam mê chia sẻ kiến thức về Web
                  Development, UI/UX và công nghệ mới nhất. Theo dõi để cập nhật
                  thêm!
                </p>
              </div>
            </div>
          </div>

          {/* --- RELATED POSTS --- */}
          {relatedPosts.length > 0 && (
            <section className="pt-12 mb-20 border-t border-slate-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900">
                  Bài viết liên quan
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related: any) => (
                  <Link
                    key={related._id}
                    href={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 transform bg-white border rounded-3xl border-slate-100 hover:shadow-2xl hover:shadow-violet-200/50 hover:-translate-y-1">
                      {related.thumbnail && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={related.thumbnail}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 transition-all bg-black/10 group-hover:bg-transparent" />
                        </div>
                      )}
                      <div className="flex flex-col flex-grow p-6">
                        <h4 className="mb-3 text-lg font-bold transition-colors text-slate-900 line-clamp-2 group-hover:text-violet-600">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-1 pt-4 mt-auto text-xs font-bold border-t text-slate-400 border-slate-100">
                          <Clock size={12} /> {related.readTime || "5 min"}
                          <span className="mx-2">•</span>
                          <span>Đọc tiếp</span>
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- COMMENT & CTA --- */}
          <div className="mb-12 text-center bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-violet-600" />
            <h3 className="mb-3 text-2xl font-black text-slate-900">
              Thảo luận & Góp ý
            </h3>
            <p className="max-w-xl mx-auto mb-8 text-slate-600">
              Bạn thấy bài viết này hữu ích? Hãy để lại bình luận bên dưới hoặc
              chia sẻ ý kiến của bạn để cộng đồng cùng phát triển nhé!
            </p>

            <div className="flex justify-center gap-4">
              <CommentButton />
              <Link href="/blog">
                <button className="px-8 py-3 font-bold transition-all border bg-slate-50 text-slate-700 rounded-xl border-slate-200 hover:bg-white hover:border-violet-200 hover:text-violet-600 hover:shadow-md">
                  Xem thêm bài viết khác
                </button>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
