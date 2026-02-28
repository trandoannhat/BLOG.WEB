// app/sitemap.ts
import { MetadataRoute } from "next";

// Định nghĩa kiểu dữ liệu gọn nhẹ để lấy sitemap
interface PostSitemapDto {
  slug: string;
  createdAt: string;
}

// Hàm lấy danh sách tất cả bài viết đã xuất bản
async function getAllPostsForSitemap(): Promise<PostSitemapDto[]> {
  try {
    // Lấy tối đa 1000 bài viết (bạn có thể tăng lên nếu blog cực lớn)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=1000&IsPublished=true`,
      { cache: "no-store" }, // Dùng no-store để luôn lấy dữ liệu mới nhất
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nhatdev.top";

  // 1. Lấy dữ liệu bài viết từ API
  const posts = await getAllPostsForSitemap();

  // 2. Tạo mảng URLs cho các bài viết (Dynamic Routes)
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "weekly",
    priority: 0.8, // Độ ưu tiên (0.0 đến 1.0)
  }));

  // 3. Khai báo các trang tĩnh (Static Routes)
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0, // Trang chủ quan trọng nhất
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 4. Gộp tất cả lại và trả về cho Next.js tự render ra XML
  return [...staticUrls, ...postUrls];
}
