// export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

// 👇 IMPORT COMPONENT QUẢNG CÁO
import PartnerAds from "@/components/PartnerAds";

// Interface đã thêm trường slug
interface ProjectDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  techStacks: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
  startDate: string;
  endDate: string;
  content?: string;
}

// Hàm Fetch Data
async function getProjectDetail(slug: string): Promise<ProjectDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Projects/slug/${slug}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

// TỐI ƯU SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDetail(slug);

  if (!project) return { title: "Không tìm thấy dự án" };

  return {
    title: `${project.name} | NhatDev`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [
        project.thumbnailUrl ||
          "https://via.placeholder.com/1200x800?text=NhatSoft+Project",
      ],
    },
  };
}

// COMPONENT HIỂN THỊ CHÍNH
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectDetail(slug);

  if (!project) {
    notFound();
  }

  return (
    // 👇 ĐÃ SỬA: Mở rộng grid chia 4 cột giống trang bài viết
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* CỘT TRÁI: NỘI DUNG DỰ ÁN (Chiếm 3/4) */}
      <div className="lg:col-span-3">
        <Link
          href="/du-an"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8 inline-block font-medium transition-colors"
        >
          &larr; Quay lại danh sách dự án
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors">
          {/* HEADER DỰ ÁN */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.techStacks?.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-lg text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* ẢNH DỰ ÁN */}
          <div className="w-full h-[300px] md:h-[450px] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-10 border border-gray-100 dark:border-gray-700 shadow-inner">
            <img
              src={
                project.thumbnailUrl ||
                "https://via.placeholder.com/1200x800?text=NhatSoft+Project"
              }
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CÁC NÚT LINK */}
          <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-gray-100 dark:border-gray-700">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Link Sản phẩm
              </a>
            )}
            {project.sourceCodeUrl && (
              <a
                href={project.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Xem Source Code
              </a>
            )}
          </div>

          {/* MÔ TẢ & NỘI DUNG CHI TIẾT DỰ ÁN */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            {!project.content && (
              <>
                <h2>Tổng quan dự án</h2>
                <p>{project.description}</p>
              </>
            )}

            {project.content && (
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            )}
          </div>

          {/* 👇 QUẢNG CÁO CUỐI DỰ ÁN (Position 2) */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Bạn cần hạ tầng để Deploy dự án tương tự?
            </h3>
            <PartnerAds position={2} />
          </div>
        </div>
      </div>

      {/* 👇 CỘT PHẢI: SIDEBAR QUẢNG CÁO */}
      <aside className="hidden lg:block space-y-10">
        <div className="sticky top-24">
          <div className="font-bold text-gray-900 dark:text-white text-lg mb-6 border-l-4 border-blue-500 pl-3">
            Công cụ đề xuất
          </div>
          {/* GỌI QUẢNG CÁO CỘT BÊN (Position 1) */}
          <PartnerAds position={1} />
        </div>
      </aside>
    </div>
  );
}
