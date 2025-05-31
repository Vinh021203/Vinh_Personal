'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rss, ArrowRightCircle, Tag } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        const transformed = data.map((post: any) => ({
          title: post.title,
          excerpt: post.content.slice(0, 100) + '...',
          slug: post.slug,
          image: post.thumbnail || '/placeholder.jpg',
          tags: post.tags || [],
        }));
        setPosts(transformed);
      } catch (err) {
        toast.error('Không thể tải dữ liệu bài viết!');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Blog & Tin tức | VinhWorks</title>
        <meta name="description" content="Cập nhật kiến thức lập trình web, xu hướng công nghệ, và hướng dẫn SEO chuẩn hiện đại từ VinhWorks." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {paginatedPosts.length > 0 && (
          <meta property="og:image" content={paginatedPosts[0].image} />
        )}
        <meta property="og:title" content="Blog & Tin tức | VinhWorks" />
        <meta property="og:description" content="Chia sẻ kiến thức lập trình, thiết kế web, tối ưu hiệu suất, và SEO từ VinhWorks." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "VinhWorks Blog",
            description: "Chia sẻ kiến thức lập trình, công nghệ và SEO hiện đại",
            url: "https://vinhworks.com/blog",
          })
        }} />
      </Head>

      <section className="min-h-screen px-6 pt-40 pb-24 text-white bg-gradient-to-b from-black via-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-teal-400 animate-bounce">
            <Rss size={24} />
            <span className="text-sm tracking-widest uppercase">Blog & Tin tức</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Cập nhật kiến thức & xu hướng mới nhất
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Chia sẻ kinh nghiệm lập trình web, thiết kế UI/UX, SEO và công nghệ dành cho lập trình viên và doanh nghiệp.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="w-8 h-8 border-4 border-teal-400 rounded-full border-t-transparent animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có bài viết nào được đăng.</p>
        ) : (
          <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3">
            {paginatedPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="overflow-hidden border border-gray-700 rounded-2xl bg-gray-800 hover:shadow-teal-400/30 hover:scale-[1.02] hover:ring-1 hover:ring-teal-400 transition-all duration-300"
              >
                <Image
                  src={post.image}
                  alt={`Ảnh đại diện cho bài viết: ${post.title}`}
                  width={800}
                  height={400}
                  className="object-cover w-full h-40"
                />
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3 text-xs text-teal-300">
                    {post.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-teal-500/10"
                      >
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-teal-400">{post.title}</h2>
                  <p className="mb-4 text-sm text-gray-400">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    title={`Đọc thêm: ${post.title}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-teal-400 hover:underline hover:text-white"
                  >
                    Đọc thêm <ArrowRightCircle size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded border transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:text-white hover:border-teal-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
