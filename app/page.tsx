// export const dynamic = "force-dynamic";
import Link from "next/link";
import dayjs from "dayjs";
import PartnerAds from "@/components/PartnerAds"; // 👈 Import component quảng cáo

// ==========================================
// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU
// ==========================================
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

interface ProjectDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
  techStacks: string[];
}

// ==========================================
// 2. CÁC HÀM FETCH DỮ LIỆU TỪ API
// ==========================================
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

async function getFeaturedProjects(): Promise<ProjectDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Projects?PageSize=3&IsFeatured=true`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Lỗi lấy dự án nổi bật:", error);
    return [];
  }
}

// ==========================================
// 3. GIAO DIỆN TRANG CHỦ
// ==========================================
export default async function HomePage() {
  const [recentPosts, featuredProjects] = await Promise.all([
    getRecentPosts(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="space-y-24 pb-12">
      {/* --- SECTION 1: HERO (Lời chào Cá nhân & Chuyên gia) --- */}
      <section className="relative py-20 md:py-32 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-blue-100 dark:border-gray-800 shadow-sm text-center px-6 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5 mix-blend-multiply"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            TDN Dev <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-3xl md:text-5xl block mt-4">
              Tech Lead & Kiến trúc sư Giải pháp
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Chào mừng bạn đến với góc kỹ thuật của mình. Nơi chia sẻ tư duy
            thiết kế hệ thống và các giải pháp phần mềm thực chiến trên nền tảng
            .NET & Cloud với tư cách là <strong>Founder tại NhatSoft</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/lien-he"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Hợp tác cùng mình
            </Link>
            <Link
              href="/du-an"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-1 transition-all shadow-sm"
            >
              Thư viện dự án
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: CHUYÊN MÔN KỸ THUẬT (Năng lực) --- */}
      <section className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-8">
          Nền tảng & Chuyên môn cốt lõi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Backend Architecture
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              .NET 8/9, Clean Architecture, Microservices
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Database & Cache
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PostgreSQL, SQL Server, Redis, MongoDB
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Modern Frontend
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              React, Next.js, TypeScript, TailwindCSS
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              DevOps & Cloud
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Docker, CI/CD, Nginx, Linux Server
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: DỰ ÁN TIÊU BIỂU --- */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
            Case Study nổi bật
          </h2>
          <Link
            href="/du-an"
            className="text-purple-600 dark:text-purple-400 font-semibold hover:underline hidden sm:block"
          >
            Tất cả dự án &rarr;
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500">
            Đang cập nhật các dự án...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                href={`/du-an/${project.slug}`}
                key={project.id}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={
                      project.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=NhatSoft+Project"
                    }
                    alt={project.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    ⭐ Case Study
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStacks?.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* --- SECTION 4: GÓC CHIA SẺ (Blog) --- */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            Kinh nghiệm thực chiến
          </h2>
          <Link
            href="/bai-viet"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline hidden sm:block"
          >
            Đọc thêm &rarr;
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
                href={`/bai-viet/${post.slug}`}
                key={post.id}
                className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={
                      post.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=NhatSoft+Blog"
                    }
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm uppercase tracking-wider">
                    {post.categoryName}
                  </div>
                </div>
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
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {post.summary}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
                      Đọc chi tiết <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* --- SECTION QUẢNG CÁO ĐỐI TÁC (Tích hợp PartnerAds Component) --- */}
      <section className="py-10 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              Công cụ & Đối tác khuyên dùng
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Những dịch vụ chất lượng mà hệ thống NhatDev đang trực tiếp sử
              dụng và đồng hành.
            </p>
          </div>
        </div>

        {/* Gọi component PartnerAds lấy quảng cáo ở vị trí số 3 (HomeBanner) */}
        <div className="max-w-4xl">
          <PartnerAds position={3} />
        </div>
      </section>

      {/* --- SECTION 5: CALL TO ACTION (CTA) --- */}
      <section className="py-16 mt-12 bg-gray-900 dark:bg-gray-800 rounded-3xl text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Cần giải quyết các bài toán về Hệ thống?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Nếu bạn đang gặp khó khăn trong việc thiết kế kiến trúc hệ thống, mở
            rộng quy mô (scaling) hoặc cần một giải pháp công nghệ tối ưu, hãy
            kết nối với tôi!
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-colors shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Liên hệ hợp tác
          </Link>
        </div>
      </section>
    </div>
  );
}
