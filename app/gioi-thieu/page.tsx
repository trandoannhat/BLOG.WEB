// export const dynamic = "force-dynamic";
import { Metadata } from "next";
import Link from "next/link";

// --- 1. ĐỊNH NGHĨA DTO CHO SYSTEM SETTINGS ---
// Cập nhật lại key cho khớp chính xác với Admin Panel của bạn
interface SystemSettingDto {
  siteName?: string;
  ContactEmail?: string; // Lưu ý: Admin viết hoa chữ C
  ContactPhone?: string;
  ContactAddress?: string;
  facebookUrl?: string;
  zaloUrl?: string; // Đã thêm Zalo
  githubUrl?: string;
  aboutContent?: string; // Dự phòng nếu sau này bạn thêm Editor vào Admin
}

// --- 2. FETCH DỮ LIỆU TỪ API VÀ ÉP KIỂU VỀ OBJECT ---
async function getSystemSettings(): Promise<SystemSettingDto | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/SystemSettings`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;

    const json = await res.json();
    const rawData = json.data || json;

    // Chuyển mảng [{key: "...", value: "..."}] thành Object {key: value} giống hệt bên Admin
    if (Array.isArray(rawData)) {
      const settingsObject = rawData.reduce(
        (acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }),
        {},
      );
      return settingsObject as SystemSettingDto;
    }

    return rawData as SystemSettingDto;
  } catch (error) {
    console.error("Lỗi khi tải SystemSettings:", error);
    return null;
  }
}

// --- 3. TỰ ĐỘNG SEO ---
export const metadata: Metadata = {
  title: "Về NhatSoft | TDN Dev - Solution Architect",
  description:
    "Thông tin giới thiệu về Founder Trần Doãn Nhất và định hướng của NhatSoft.",
};

// --- 4. GIAO DIỆN CHÍNH ---
export default async function AboutPage() {
  const settings = await getSystemSettings();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* HEADER: Tiêu đề trang */}
      <div className="text-center mb-16 lg:mb-24">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6 tracking-tight">
          Về NhatSoft
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
          Đam mê kiến tạo các hệ thống phần mềm hiệu suất cao và chia sẻ kiến
          thức công nghệ đến cộng đồng.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* ========================================================= */}
        {/* CỘT TRÁI: Ảnh Avatar & Thông tin cơ bản */}
        {/* ========================================================= */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <img
                  src="/images/avatar.jpg" // 👈 Ảnh cá nhân của bạn
                  alt="Trần Doãn Nhất - NhatSoft Founder"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              {settings?.siteName || "Trần Doãn Nhất"}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-4">
              Founder @ NhatSoft
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Software Engineer & Tech Lead với niềm đam mê cháy bỏng trong việc
              xây dựng các kiến trúc hệ thống mở rộng (System Design) và tối ưu
              hóa hiệu năng (Performance Tuning).
            </p>

            <div className="w-full flex flex-col gap-4">
              {/* Nút Liên hệ: Lấy ContactEmail từ DB */}
              <a
                href={`mailto:${settings?.ContactEmail || "doannhatit@gmail.com"}`}
                className="w-full flex justify-center items-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Liên hệ hợp tác
              </a>

              {/* Các nút Mạng xã hội */}
              <div className="flex justify-center lg:justify-start gap-4 mt-2">
                {/* Nút GitHub */}
                <a
                  href={settings?.githubUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                  title="GitHub"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* Nút Zalo (Thay cho LinkedIn) */}
                <a
                  href={settings?.zaloUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                  title="Zalo"
                >
                  <span className="sr-only">Zalo</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </a>

                {/* Nút Facebook */}
                <a
                  href={settings?.facebookUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                  title="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CỘT PHẢI: Chi tiết & Kỹ năng */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3 transition-colors">
              <span className="text-4xl">👋</span> Xin chào!
            </h3>

            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed max-w-none transition-colors prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
              {settings?.aboutContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: settings.aboutContent }}
                />
              ) : (
                <>
                  <p>
                    Mình là <strong>Trần Doãn Nhất</strong>, người đứng sau
                    thương hiệu <strong>NhatSoft</strong>. Với nền tảng vững
                    chắc và nhiều năm "chinh chiến" qua các dự án từ Front-end
                    đến Back-end, mình luôn khao khát dùng công nghệ để giải
                    quyết các bài toán hóc búa của doanh nghiệp.
                  </p>
                  <p>
                    Đặc sản của mình là thiết kế kiến trúc hệ thống (System
                    Design), tối ưu hóa database, và biến những luồng nghiệp vụ
                    rối rắm thành các khối mã nguồn sạch sẽ, dễ bảo trì. Mình
                    tin rằng code không chỉ để máy chạy, mà còn để con người
                    (các developer khác) đọc và tiếp nối.
                  </p>
                  <p>
                    Ngoài công việc lập trình, mình xem Blog này như một "ngôi
                    nhà số" để chia sẻ lại những vấp ngã, những kinh nghiệm thực
                    chiến đắt giá. Hy vọng những bài viết của NhatSoft sẽ giúp
                    bạn tiết kiệm được vài giờ hì hục debug!
                  </p>
                </>
              )}
            </div>
          </section>

          <blockquote className="border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 px-6 py-5 rounded-r-2xl italic text-gray-700 dark:text-gray-300 text-lg shadow-sm transition-colors">
            "Bất kỳ kẻ ngốc nào cũng có thể viết code cho máy tính hiểu. Nhưng
            lập trình viên giỏi là người viết code cho con người hiểu." <br />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2 block">
              — Martin Fowler
            </span>
          </blockquote>

          {/* Section: Kho vũ khí công nghệ */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2 transition-colors">
              💻 Kho vũ khí công nghệ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Backend */}
              <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-lg mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                  Backend & Database
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    ".NET 8/9",
                    "C#",
                    "Node.js",
                    "PostgreSQL",
                    "SQL Server",
                    "MongoDB",
                    "Redis",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-lg mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "Tailwind CSS",
                    "Redux",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps */}
              <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center rounded-lg mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                  DevOps, Cloud & Khác
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Docker",
                    "CI/CD",
                    "Git/GitHub",
                    "System Design",
                    "Microservices",
                    "Machine Learning Concepts",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Định hướng tương lai */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
              🚀 Định hướng tương lai
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden transition-colors">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg relative z-10">
                Hành trình của NhatSoft không chỉ dừng lại ở việc viết code. Mục
                tiêu dài hạn của mình là tiếp tục đào sâu vào{" "}
                <strong>Kiến trúc phần mềm (Software Architecture)</strong>, xây
                dựng các hệ thống SaaS đa khách hàng (Multi-tenant) mạnh mẽ, và
                nghiên cứu tích hợp các giải pháp Trí tuệ nhân tạo (AI) vào ứng
                dụng thực tiễn để giải quyết bài toán cốt lõi của doanh nghiệp.
              </p>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Sẵn sàng cho những thử thách mới!
                </span>
                <Link
                  href="/du-an"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:shadow-lg flex items-center gap-2"
                >
                  Khám phá các Dự án
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
