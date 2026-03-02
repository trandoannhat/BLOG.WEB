import dayjs from "dayjs";
import Link from "next/link";

interface PostDto {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnailUrl: string;
  categoryName: string;
  createdAt: string;
  viewCount: number;
}

async function getNewsPosts(): Promise<PostDto[]> {
  try {
    // 1. Lấy tất cả danh mục
    const catRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Categories`,
      { cache: "no-store" },
    );
    if (!catRes.ok) return [];
    const catJson = await catRes.json();
    const categories = catJson.data || [];

    // 2. Tìm danh mục có chữ "Tin tức" hoặc slug "tin-tuc"
    const newsCategory = categories.find(
      (c: any) =>
        c.slug?.includes("tin-tuc") ||
        c.name?.toLowerCase().includes("tin tức"),
    );

    // 3. Nếu không có danh mục Tin tức, hoặc tìm thấy nhưng lấy API lỗi
    if (!newsCategory) return [];

    const postRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=20&IsPublished=true&CategoryId=${newsCategory.id}`,
      { cache: "no-store" },
    );
    if (!postRes.ok) return [];
    const postJson = await postRes.json();
    return postJson.data || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách tin tức:", error);
    return [];
  }
}

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Tin tức & Cập nhật
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Những thông báo mới nhất về dự án, hệ thống và các hoạt động của
          NhatSoft.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
          Hiện tại chưa có tin tức nào được đăng tải...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img
                  src={
                    post.thumbnailUrl ||
                    "https://via.placeholder.com/600x400?text=News"
                  }
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-md">
                  Tin Mới
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 font-medium mb-3 gap-2">
                  <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
                  <span>•</span>
                  <span>{post.viewCount} lượt xem</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-5 flex-1 leading-relaxed">
                  {post.summary}
                </p>

                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto flex items-center group-hover:translate-x-1 transition-transform">
                  Đọc chi tiết <span className="ml-1">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
