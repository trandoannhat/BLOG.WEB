// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs"; // ĐÃ THÊM: Import dayjs
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
  categoryId: string,
  currentPostId: string,
): Promise<PostDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?CategoryId=${categoryId}&PageSize=4&IsPublished=true`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const posts = json.data || [];

    // Lọc bỏ bài viết hiện tại và lấy tối đa 3 bài
    return posts.filter((p: PostDto) => p.id !== currentPostId).slice(0, 3);
  } catch (error) {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.categoryId, post.id);

  return (
    <article className="max-w-4xl mx-auto py-10">
      <Link
        href="/blog"
        className="text-gray-500 hover:text-blue-600 transition-colors mb-8 inline-flex items-center font-medium"
      >
        &larr; Quay lại danh sách
      </Link>

      {/* HEADER BÀI VIẾT */}
      <header className="mb-10 text-center">
        <Link
          href={`/blog?categoryId=${post.categoryId}`}
          className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4 hover:bg-blue-100 transition"
        >
          {post.categoryName}
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center text-gray-500 text-sm gap-4 font-medium">
          <span>
            Đăng bởi{" "}
            <span className="text-gray-900">
              {post.authorName || "NhatDev"}
            </span>
          </span>
          <span>•</span>
          <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>{" "}
          {/* ĐÃ FIX: dùng dayjs */}
          <span>•</span>
          <span>{post.viewCount} lượt xem</span>
        </div>
      </header>

      {/* ẢNH BÌA */}
      {post.thumbnailUrl && (
        <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden mb-12 shadow-md">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* NỘI DUNG CHÍNH */}
      <div
        className="prose prose-lg max-w-none text-gray-800 
                   prose-headings:text-gray-900 prose-headings:font-bold
                   prose-a:text-blue-600 hover:prose-a:text-blue-500
                   prose-img:rounded-xl prose-img:mx-auto prose-img:shadow-sm
                   mb-20"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* BÀI VIẾT LIÊN QUAN */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Bài viết cùng chủ đề
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                href={`/blog/${related.slug}`}
                key={related.id}
                className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={
                      related.thumbnailUrl ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={related.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2 text-base">
                    {related.title}
                  </h4>
                  <div className="text-xs text-gray-500 mt-auto">
                    {dayjs(related.createdAt).format("DD/MM/YYYY")}{" "}
                    {/* ĐÃ FIX: dùng dayjs */}
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
