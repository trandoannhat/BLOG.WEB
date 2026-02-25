import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu
interface PostDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string;
  categoryName: string;
  authorName: string;
  createdAt: string;
  viewCount: number;
}

// Hàm lấy dữ liệu bài viết từ Backend
async function getPostDetail(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts/byslug/${slug}`,
      {
        cache: "no-store", // Tắt cache để test cho dễ
      },
    );

    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết bài viết:", error);
    return null;
  }
}

// 👇 ĐÃ SỬA CHUẨN NEXT.JS 15 (Chỉ dùng 1 hàm duy nhất)
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Phải "await" params trước để lấy ra slug
  const { slug } = await params;

  // Gọi API lấy dữ liệu
  const post = await getPostDetail(slug);

  // Nếu không tìm thấy bài viết -> Hiển thị trang 404
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-10">
      {/* Nút quay lại */}
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-8 inline-block font-medium"
      >
        &larr; Quay lại trang chủ
      </Link>

      {/* HEADER BÀI VIẾT */}
      <header className="mb-10 text-center">
        <div className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
          {post.categoryName}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center text-gray-500 text-sm gap-4">
          <span>
            Đăng bởi <strong>{post.authorName || "NhatDev"}</strong>
          </span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
          <span>•</span>
          <span>{post.viewCount} lượt xem</span>
        </div>
      </header>

      {/* ẢNH BÌA */}
      {post.thumbnailUrl && (
        <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden mb-12 shadow-lg">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* NỘI DUNG BÀI VIẾT (Render HTML từ React Quill) */}
      <div
        className="prose prose-lg max-w-none text-gray-800 
                   prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500
                   prose-img:rounded-xl prose-img:mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
