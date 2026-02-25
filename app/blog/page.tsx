import Link from "next/link";

// 1. Định nghĩa kiểu dữ liệu Bài viết
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

// 2. Hàm lấy danh sách bài viết từ Backend
async function getPosts(): Promise<PostDto[]> {
  try {
    // Lấy 20 bài viết mới nhất đã xuất bản
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=20&IsPublished=true`,
      { cache: "no-store" }, // Tắt cache khi đang dev
    );

    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="py-8">
      {/* HEADER TRANG BLOG */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Blog & Chia sẻ
        </h1>
        <p className="text-lg text-gray-600">
          Nơi tôi ghi chép lại hành trình làm nghề, những kinh nghiệm thực chiến
          về lập trình Backend, Frontend và Tư duy hệ thống.
        </p>
      </div>

      {/* DANH SÁCH BÀI VIẾT */}
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          Chưa có bài viết nào được xuất bản...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* ẢNH BÌA BÀI VIẾT */}
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                <img
                  src={
                    post.thumbnailUrl ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge Danh mục */}
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-md text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wide">
                  {post.categoryName}
                </div>
              </div>

              {/* NỘI DUNG THẺ (CARD) */}
              <div className="p-6 flex flex-col flex-1">
                {/* Thông tin phụ: Ngày tháng & Lượt xem */}
                <div className="flex items-center text-xs text-gray-400 font-medium mb-3 gap-2">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                  <span>•</span>
                  <span>{post.viewCount} lượt xem</span>
                </div>

                {/* Tiêu đề */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {post.title}
                </h3>

                {/* Tóm tắt */}
                <p className="text-sm text-gray-600 line-clamp-3 mb-5 flex-1 leading-relaxed">
                  {post.summary}
                </p>

                {/* Nút Đọc tiếp */}
                <div className="text-sm font-bold text-blue-600 mt-auto flex items-center group-hover:translate-x-1 transition-transform">
                  Đọc tiếp <span className="ml-1">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
