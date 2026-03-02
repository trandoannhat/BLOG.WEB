import { notFound } from "next/navigation";
import Link from "next/link";

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  techStacks: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
  startDate: string;
  endDate: string;
  content?: string; // Bắt buộc dùng cho các dự án viết chi tiết như DTSoft
}

async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Projects/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectDetail(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <Link
        href="/projects"
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
        <div className="w-full h-[300px] md:h-[450px] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-10 border border-gray-100 dark:border-gray-700">
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
        {/* Class dark:prose-invert rất quan trọng để đổi màu text bài viết sang trắng khi ở chế độ Dark Mode */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {/* Nếu KHÔNG có content chi tiết thì mới hiện description */}
          {!project.content && (
            <>
              <h2>Tổng quan dự án</h2>
              <p>{project.description}</p>
            </>
          )}

          {/* ĐÃ MỞ KHÓA: Nếu có trường Content HTML từ Editor, render trực tiếp ra đây */}
          {project.content && (
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          )}
        </div>
      </div>
    </div>
  );
}
