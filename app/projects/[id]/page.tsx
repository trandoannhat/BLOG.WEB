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
  // Nếu DB của bạn có thêm trường Content (HTML) cho dự án thì dùng, không thì thôi
  content?: string;
}

async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  try {
    // Gọi API lấy dự án theo ID
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

// Next.js 15: params là Promise
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
    <div className="max-w-4xl mx-auto py-10">
      <Link
        href="/projects"
        className="text-blue-600 hover:underline mb-8 inline-block font-medium"
      >
        &larr; Quay lại danh sách dự án
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
        {/* HEADER DỰ ÁN */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          {project.name}
        </h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.techStacks?.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ẢNH DỰ ÁN */}
        <div className="w-full h-[300px] md:h-[450px] bg-gray-100 rounded-xl overflow-hidden mb-10">
          <img
            src={
              project.thumbnailUrl ||
              "https://via.placeholder.com/1200x800?text=No+Image"
            }
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CÁC NÚT LINK */}
        <div className="flex gap-4 mb-10 pb-10 border-b">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800"
            >
              🌍 Xem Demo (Live)
            </a>
          )}
          {project.sourceCodeUrl && (
            <a
              href={project.sourceCodeUrl}
              target="_blank"
              className="px-6 py-3 bg-white text-gray-900 border-2 rounded-xl font-medium hover:bg-gray-50"
            >
              💻 Xem Source Code
            </a>
          )}
        </div>

        {/* MÔ TẢ DỰ ÁN */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <h2>Tổng quan dự án</h2>
          <p>{project.description}</p>

          {/* Nếu backend bạn có trường Nội dung chi tiết (như React Quill) thì bật dòng này lên: */}
          {/* {project.content && <div dangerouslySetInnerHTML={{ __html: project.content }} />} */}
        </div>
      </div>
    </div>
  );
}
