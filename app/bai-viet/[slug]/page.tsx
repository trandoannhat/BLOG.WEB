// https://nhatdev.top
// app/bai-viet/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import { PostDto } from "@/types/post.types";

async function getPostDetail(slug: string): Promise<PostDto | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts/byslug/${slug}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

async function getRelatedPosts(
  categorySlug: string,
  currentPostId: string,
): Promise<PostDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?CategorySlug=${categorySlug}&PageSize=4&IsPublished=true`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const posts = json.data || [];
    return posts.filter((p: PostDto) => p.id !== currentPostId).slice(0, 3);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);
  if (!post) return { title: "Không tìm thấy bài viết | NhatDev" };

  return {
    title: `${post.title} | NhatDev`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://nhatdev.top/bai-viet/${post.slug}`,
      siteName: "NhatDev Blog",
      images: [{ url: post.thumbnailUrl || "" }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.categorySlug, post.id);

  return (
    <article className="max-w-4xl mx-auto py-10 px-4">
      <Link
        href="/bai-viet"
        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8 inline-flex items-center font-medium"
      >
        &larr; Quay lại danh sách
      </Link>

      <header className="mb-10 text-center">
        <Link
          href={`/bai-viet?category=${post.categorySlug}`}
          className="inline-block bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase mb-4 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
        >
          {post.categoryName}
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
          {post.title}
        </h1>
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm gap-4 font-medium">
          <span>
            Đăng bởi{" "}
            <span className="text-gray-900 dark:text-white transition-colors">
              {post.authorName || "NhatDev"}
            </span>
          </span>
          <span>•</span>
          <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
          <span>•</span>
          <span>{post.viewCount} lượt xem</span>
        </div>
      </header>

      {post.thumbnailUrl && (
        <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden mb-12 shadow-md">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none dark:prose-invert mb-20"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 dark:border-gray-800 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">
            Bài viết cùng chủ đề
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                href={`/bai-viet/${related.slug}`}
                key={related.id}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={
                      related.thumbnailUrl ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={related.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors">
                    {related.title}
                  </h4>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                    {dayjs(related.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
