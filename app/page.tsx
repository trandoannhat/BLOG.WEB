import Link from "next/link";
import dayjs from "dayjs";

// Định nghĩa kiểu dữ liệu cho bài viết
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

// Hàm lấy 6 bài viết mới nhất từ VPS
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
    console.error("Lỗi lấy bài viết mới:", error);
    return [];
  }
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts();

  return (
    <div className="space-y-20">
      {/* 1. HERO SECTION - PHẦN GIỚI THIỆU BẢN THÂN */}
      <section className="relative py-20 md:py-32 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-800 shadow-sm text-center px-6 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Xin chào, tôi là {/* 👇 Đổi thành NhatSoft */}
            <span className="text-blue-600 dark:text-blue-400">NhatSoft</span>
          </h1>
          {/* 👇 Nội dung chào mừng được mở rộng, bao quát hơn */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Nơi ghi chép lại hành trình làm nghề và chia sẻ kinh nghiệm thực
            chiến. Tập trung vào{" "}
            <strong className="text-gray-900 dark:text-white">
              Kiến trúc Hệ thống (System Design)
            </strong>
            , tối ưu hiệu năng và những công nghệ mới nhất để giải quyết các bài
            toán phần mềm phức tạp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              Đọc Blog Ngay
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-1 transition-all"
            >
              Xem Dự Án
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LATEST POSTS - DANH SÁCH BÀI VIẾT MỚI */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            Bài viết mới nhất
          </h2>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline hidden sm:block"
          >
            Xem tất cả &rarr;
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
            Đang cập nhật bài viết mới...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300"
              >
                {/* ẢNH BÌA */}
                <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={
                      post.thumbnailUrl ||
                      // 👇 Đổi ảnh mặc định thành NhatSoft Blog
                      "https://via.placeholder.com/600x400?text=NhatSoft+Blog"
                    }
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* TAG DANH MỤC */}
                  <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm uppercase tracking-wider">
                    {post.categoryName}
                  </div>
                </div>

                {/* NỘI DUNG */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium mb-3 gap-3">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {dayjs(post.createdAt).format("DD/MM/YYYY")}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {post.viewCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
                      Đọc bài viết <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Nút xem tất cả cho Mobile */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </section>
    </div>
  );
}
