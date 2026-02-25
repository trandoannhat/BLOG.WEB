import Link from "next/link";
import Image from "next/image";
// Đảm bảo bạn đã copy file type sang Next.js nhé
import { PostDto } from "@/types/post.types";

// Hàm gọi API trực tiếp từ Server (Không cần useEffect)
async function getRecentPosts(): Promise<PostDto[]> {
  try {
    // Gọi API Backend .NET (Lấy 6 bài mới nhất đã xuất bản)
    // Tắt cache để luôn lấy bài mới (hoặc dùng 'force-cache' kết hợp revalidate sau này)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=6&IsPublished=true`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Lỗi lấy bài viết:", error);
    return [];
  }
}

export default async function HomePage() {
  // Lấy data ngay lúc render trên server
  const posts = await getRecentPosts();

  return (
    <div className="space-y-16">
      {/* SECTION GIỚI THIỆU */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Xin chào, tôi là <span className="text-blue-600">NhatDev</span> 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Tôi là Software Engineer & Tech Lead. Nơi đây tôi chia sẻ hành trình
          lập trình, các dự án tâm huyết và những kiến thức thực tế về .NET,
          React, Next.js.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Xem Dự án
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Đọc Blog
          </Link>
        </div>
      </section>

      {/* SECTION BÀI VIẾT MỚI */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Bài viết mới nhất
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:underline font-medium"
          >
            Xem tất cả &rarr;
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Đang cập nhật bài viết...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group flex flex-col bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* ẢNH BÌA */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={
                      post.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                    {post.categoryName}
                  </div>
                </div>

                {/* NỘI DUNG CARD */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-gray-400 mb-2">
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")} •{" "}
                    {post.viewCount} lượt xem
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {post.summary}
                  </p>
                  <div className="text-sm font-medium text-blue-600 mt-auto">
                    Đọc tiếp &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
