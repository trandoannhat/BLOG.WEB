// app/page.tsx
import dayjs from "dayjs"; // (Dùng để format ngày tháng cho phù hợp beckend trả về)
import Link from "next/link";
import { PostDto } from "@/types/post.types";

// Hàm lấy bài viết mới nhất
async function getRecentPosts(): Promise<PostDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=6&IsPublished=true`,
      { cache: "no-store" },
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
  const posts = await getRecentPosts();

  return (
    <div className="space-y-20">
      {/* SECTION GIỚI THIỆU */}
      <section className="text-center pt-16 pb-12 md:pt-24 md:pb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Xin chào, tôi là <span className="text-blue-600">NhatDev</span> 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tôi là Software Engineer & Tech Lead. Nơi đây tôi chia sẻ hành trình
          lập trình, các dự án tâm huyết và những kiến thức thực tế về .NET,
          React, Next.js.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md"
          >
            Xem Dự án
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm"
          >
            Đọc Blog
          </Link>
        </div>
      </section>

      {/* SECTION BÀI VIẾT MỚI */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Bài viết mới nhất
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center"
          >
            Xem tất cả <span className="ml-1">&rarr;</span>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-16 bg-white border border-gray-200 rounded-2xl border-dashed">
            Đang cập nhật bài viết...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                {/* ẢNH BÌA */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                  <img
                    src={
                      post.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-md text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wide">
                    {post.categoryName}
                  </div>
                </div>

                {/* NỘI DUNG CARD */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-gray-400 font-medium mb-3 gap-2">
                    <span>
                      {/* {new Date(post.createdAt).toLocaleDateString("vi-VN")} */}
                      {dayjs(post.createdAt).format("DD/MM/YYYY")}
                    </span>
                    <span>•</span>
                    <span>{post.viewCount} lượt xem</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 line-clamp-2 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-5 flex-1 leading-relaxed">
                    {post.summary}
                  </p>
                  <div className="text-sm font-bold text-blue-600 mt-auto flex items-center group-hover:translate-x-1 transition-transform">
                    Đọc tiếp <span className="ml-1">&rarr;</span>
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
