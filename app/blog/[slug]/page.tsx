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
  Sparkles,
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

  // Mock data for enhanced features
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
    <div>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 grid-animation"
            style={{
              backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="absolute inset-0">
          <div
            className="absolute rounded-full w-96 h-96 blur-3xl float-animation pulse-glow"
            style={{
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
              left: "10%",
              top: "20%",
            }}
          />
          <div
            className="absolute rounded-full w-80 h-80 blur-3xl float-animation-reverse pulse-glow"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
              right: "10%",
              bottom: "20%",
            }}
          />
        </div>

        {/* Floating Tech Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-purple-400/20 particle-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Fixed Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b bg-slate-900/95 backdrop-blur-xl border-purple-500/20">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link href="/blog">
              <button className="flex items-center gap-2 px-4 py-2 text-purple-400 transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 focus-ring">
                <ArrowLeft size={16} />
                <span>Quay lại Blog</span>
              </button>
            </Link>

            {/* Client Component for interactive buttons */}
            <BlogDetailClient
              postSlug={postData.slug}
              postTitle={postData.title}
            />
          </div>
        </nav>

        <div className="relative z-10 px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-8 text-sm animate-slide-up">
              <Link
                href="/"
                className="text-purple-400 transition-colors hover:text-purple-300"
              >
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <Link
                href="/blog"
                className="text-purple-400 transition-colors hover:text-purple-300"
              >
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="max-w-xs font-medium text-white truncate">
                {postData.title}
              </span>
            </nav>

            {/* Article Header */}
            <div
              className="mb-12 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-purple-300 border rounded-full bg-purple-500/20 border-purple-500/30 shimmer-effect">
                <Tag className="w-4 h-4" />
                {postData.category}
              </div>

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl gradient-text-purple">
                {postData.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 p-6 glass-card">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{postData.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">
                    {new Date(postData.displayDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">{postData.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">
                    {postData.views} lượt xem
                  </span>
                </div>
              </div>

              {/* Tags */}
              {postData.tags && postData.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {postData.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm text-purple-300 border bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border-purple-500/30 backdrop-blur-sm hover-lift"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Thumbnail */}
            {postData.thumbnail && (
              <div
                className="mb-12 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative hover-glow">
                  <div className="absolute opacity-75 -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl" />
                  <div className="relative overflow-hidden border rounded-3xl border-purple-500/20 backdrop-blur-sm">
                    <Image
                      src={postData.thumbnail}
                      alt={postData.title}
                      width={1200}
                      height={600}
                      className="object-cover w-full h-64 transition-transform duration-500 md:h-96 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Article Content */}
            <div
              className="mb-12 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative hover-glow">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl" />
                <article className="relative p-8 md:p-12 glass-card-purple">
                  <div className="prose-enhanced custom-scrollbar">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {postData.content}
                    </ReactMarkdown>
                  </div>
                </article>
              </div>
            </div>

            {/* Enhanced Social Share */}
            <div
              className="mb-12 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="p-6 md:p-8 glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">
                    Chia sẻ bài viết
                  </h3>
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all duration-300 bg-blue-600 shadow-lg rounded-xl hover:bg-blue-500 hover:shadow-xl hover-lift"
                  >
                    <Facebook size={20} />
                    <span className="font-medium">Facebook</span>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all duration-300 shadow-lg bg-sky-500 rounded-xl hover:bg-sky-400 hover:shadow-xl hover-lift"
                  >
                    <Twitter size={20} />
                    <span className="font-medium">Twitter</span>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all duration-300 bg-blue-800 shadow-lg rounded-xl hover:bg-blue-700 hover:shadow-xl hover-lift"
                  >
                    <Linkedin size={20} />
                    <span className="font-medium">LinkedIn</span>
                  </a>

                  {/* Client Component for Copy button */}
                  <BlogDetailClient
                    postSlug={postData.slug}
                    postTitle={postData.title}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Related Posts */}
            {relatedPosts.length > 0 && (
              <div
                className="pt-12 border-t border-purple-500/20 animate-slide-up"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="mb-12 text-center">
                  <h3 className="flex items-center justify-center gap-3 mb-4 text-2xl font-bold text-white md:text-3xl">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    Bài viết liên quan
                  </h3>
                  <p className="text-gray-300">
                    Khám phá thêm những bài viết thú vị khác
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  {relatedPosts.map((related: any, i: number) => (
                    <div
                      key={related._id}
                      className="relative overflow-hidden group glass-card-purple hover-lift hover-glow"
                      style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                    >
                      {related.thumbnail && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={related.thumbnail}
                            alt={related.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80" />
                        </div>
                      )}

                      <div className="p-6">
                        <h4 className="mb-3 text-lg font-bold text-white transition-all group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="mb-4 text-sm text-gray-300 line-clamp-3">
                          {related.content?.slice(0, 100)}...
                        </p>

                        <Link href={`/blog/${related.slug}`}>
                          <button className="flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300">
                            <span>Đọc thêm</span>
                            <ArrowLeft className="w-4 h-4 transition-transform rotate-180 group-hover:translate-x-1" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced CTA Section */}
            <div
              className="mt-16 text-center animate-slide-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="relative p-8 md:p-12 glass-card-purple hover-glow">
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                  💬 Bạn thấy bài viết này hữu ích?
                </h3>
                <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                  Hãy chia sẻ với bạn bè hoặc để lại comment để thảo luận thêm
                  về chủ đề này
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  {/* Client Component for Comment button */}
                  <CommentButton />

                  <Link href="/blog">
                    <button className="px-8 py-4 btn-outline hover-lift">
                      <TrendingUp size={20} className="inline mr-3" />
                      <span>Xem thêm bài viết</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
