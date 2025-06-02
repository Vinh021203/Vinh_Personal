import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connectDB } from '@/libs/mongodb';
import Post from '@/models/Post';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await Post.findOne({ slug: decodeURIComponent(slug) }).lean();
  if (!post) return {};
  return {
    title: `${post.title} | VinhWorks`,
    description: post.content?.slice(0, 150) || '',
    openGraph: {
      title: `${post.title} | VinhWorks`,
      description: post.content?.slice(0, 150) || '',
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
      url: `https://vinhworks.com/blog/${slug}`,
      type: 'article',
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

  const relatedPosts = await Post.find({ slug: { $ne: post.slug } }).limit(3).lean();

  const encodedUrl = encodeURIComponent(`https://vinhworks.com/blog/${post.slug}`);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <section className="min-h-screen px-4 py-20 text-white md:px-10 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/" className="text-teal-400 hover:underline">Trang chủ</Link> /{' '}
          <Link href="/blog" className="text-teal-400 hover:underline">Blog</Link> /{' '}
          <span>{post.title}</span>
        </nav>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="mb-8 overflow-hidden border border-gray-800 shadow-xl rounded-xl">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={1200}
              height={600}
              className="object-cover w-full h-64 md:h-96"
              priority
            />
          </div>
        )}

        {/* Title + Date */}
        <h1 className="mb-4 text-3xl font-extrabold text-teal-400 md:text-5xl">{post.title}</h1>
        {post.date && (
          <p className="mb-8 text-sm text-gray-500">
            🕒 Đăng ngày {new Date(post.date).toLocaleDateString('vi-VN')}
          </p>
        )}

        {/* Markdown Content */}
        <article className="prose text-gray-300 prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {/* Social Share Buttons */}
        <div className="mt-10">
          <p className="mb-2 text-sm font-semibold text-teal-400">📤 Chia sẻ bài viết:</p>
          <div className="flex gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              <Facebook size={16} /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white transition-all rounded-lg bg-sky-500 hover:bg-sky-400"
            >
              <Twitter size={16} /> Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white transition-all bg-blue-800 rounded-lg hover:bg-blue-700"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-block px-4 py-2 text-sm font-medium text-white transition-all bg-teal-500 rounded hover:bg-teal-400"
          >
            ← Quay lại Blog
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 mt-16 border-t border-gray-700">
            <h3 className="mb-6 text-xl font-semibold text-teal-300">📖 Đọc thêm bài liên quan</h3>
            <ul className="space-y-4">
              {relatedPosts.map((related) => (
                <li key={(related as any)._id as string}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="text-base text-gray-400 transition hover:text-teal-300 hover:underline"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
