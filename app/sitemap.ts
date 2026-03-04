// app/sitemap.ts
export const dynamic = "force-dynamic";
import { MetadataRoute } from "next";

interface SitemapDto {
  slug: string;
  createdAt: string;
}

// 1. Hàm lấy danh sách bài viết
async function getPosts(): Promise<SitemapDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=1000&IsPublished=true`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

// 2. Hàm lấy danh sách dự án
async function getProjects(): Promise<SitemapDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Projects?PageSize=100`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    // Lưu ý: Project thường dùng trường StartDate hoặc CreatedAt, tùy DB của bạn
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nhatdev.top";

  // Lấy dữ liệu đồng thời để tối ưu thời gian gen sitemap
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  // 3. URLs cho bài viết (Việt hóa: /bai-viet)
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/bai-viet/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. URLs cho dự án (Việt hóa: /du-an)
  const projectUrls: MetadataRoute.Sitemap = projects.map((proj) => ({
    url: `${baseUrl}/du-an/${proj.slug}`,
    lastModified: proj.createdAt ? new Date(proj.createdAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Khai báo các trang tĩnh (Đã Việt hóa URL)
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bai-viet`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/du-an`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ung-ho`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...postUrls, ...projectUrls];
}
