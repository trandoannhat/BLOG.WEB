import Image from "next/image";
import Link from "next/link";

interface ProjectDto {
  id: string;
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
    <div className="py-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Dự án nổi bật
        </h1>
        <p className="text-lg text-gray-600">
          Tổng hợp những sản phẩm, hệ thống và ứng dụng tôi đã tham gia phát
          triển. Từ Web Application, API Services cho đến các giải pháp quản trị
          doanh nghiệp.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500 py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          Đang cập nhật dự án...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* 👇 PHẦN BỌC LINK: Bấm vào Ảnh hoặc Tiêu đề sẽ sang trang Chi tiết */}
              <Link
                href={`/projects/${project.id}`}
                className="flex flex-col flex-1 cursor-pointer"
              >
                {/* Ảnh Thumbnail */}
                <div className="relative h-56 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                  <img
                    src={
                      project.thumbnailUrl ||
                      "https://via.placeholder.com/600x400?text=No+Image"
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stacks */}
                  {project.techStacks && project.techStacks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.techStacks.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStacks.length > 4 && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          +{project.techStacks.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>

              {/* 👇 PHẦN NÚT ĐỘC LẬP: Nằm ngoài Link để không bị lỗi click */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.sourceCodeUrl && (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-white text-gray-800 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                  {/* Nút Xem chi tiết nếu không có Link ngoài */}
                  {!project.liveDemoUrl && !project.sourceCodeUrl && (
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 text-center py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
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
    </div>
  );
}
