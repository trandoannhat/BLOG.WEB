// export const dynamic = "force-dynamic";
import Link from "next/link";

// 👇 IMPORT COMPONENT QUẢNG CÁO
import PartnerAds from "@/components/PartnerAds";

interface ProjectDto {
  id: string;
  slug: string;
  name: string;
  clientName?: string;
  description: string;
  thumbnailUrl: string;
  techStacks: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  isFeatured: boolean;
  startDate: string;
}

async function getProjects(): Promise<ProjectDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Projects?PageSize=50`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách dự án:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Dự án nổi bật
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tổng hợp những sản phẩm, hệ thống và nền tảng cốt lõi mà NhatSoft đã
          trực tiếp thiết kế kiến trúc và phát triển.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
          Đang cập nhật dự án...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
            >
              <Link
                href={`/du-an/${project.slug}`}
                className="flex flex-col flex-1 cursor-pointer"
              >
                {/* Ảnh Thumbnail */}
                <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-b border-gray-100 dark:border-gray-700">
                  <img
                    src={
                      project.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=NhatSoft+Project"
                    }
                    alt={project.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.isFeatured && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      ⭐ Nổi bật
                    </div>
                  )}
                </div>

                {/* Nội dung Card */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stacks */}
                  {project.techStacks && project.techStacks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.techStacks.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-md text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStacks.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                          +{project.techStacks.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>

              {/* KHU VỰC NÚT ĐỘC LẬP TẠI FOOTER CARD */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                    >
                      Link Sản phẩm
                    </a>
                  )}
                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                  {/* Nút Xem chi tiết nếu không có cả 2 link ngoài */}
                  {!project.liveDemoUrl && !project.sourceCodeUrl && (
                    <Link
                      href={`/du-an/${project.slug}`}
                      className="flex-1 text-center py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-lg text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Xem chi tiết &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 👇 THÊM SECTION QUẢNG CÁO DƯỚI CÙNG DANH SÁCH (Position 4) */}
      <section className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Công cụ & Nền tảng Đề xuất
          </h2>
          <p className="text-gray-500 mt-2">
            Các dịch vụ mình đang sử dụng để vận hành các dự án trên
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Nhớ vào Admin tạo quảng cáo với vị trí là "Trang Công cụ" nhé */}
          <PartnerAds position={4} />
        </div>
      </section>
    </div>
  );
}
