import Link from "next/link";
import dayjs from "dayjs";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = q || "";

  // Gọi API lấy bài viết theo từ khóa (Giả định API có tham số Keyword)
  let results = [];
  try {
    if (keyword) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Posts?Keyword=${encodeURIComponent(keyword)}&PageSize=20&IsPublished=true`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const json = await res.json();
        results = json.data || [];
      }
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm:", error);
  }

  return (
    <div className="py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
        Kết quả tìm kiếm
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        Tìm thấy <strong>{results.length}</strong> bài viết cho từ khóa:{" "}
        <span className="text-blue-600 dark:text-blue-400">"{keyword}"</span>
      </p>

      {results.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Không tìm thấy bài viết nào phù hợp.
          </p>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block"
          >
            Xem tất cả bài viết &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                <img
                  src={
                    post.thumbnailUrl || "https://via.placeholder.com/600x400"
                  }
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                  {post.categoryName}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-1">
                  {post.summary}
                </p>
                <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
                  {dayjs(post.createdAt).format("DD/MM/YYYY")} •{" "}
                  {post.viewCount} lượt xem
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
