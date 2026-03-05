// export const dynamic = "force-dynamic";
import dayjs from "dayjs";
import Link from "next/link";

// 👇 IMPORT COMPONENT QUẢNG CÁO
import PartnerAds from "@/components/PartnerAds";

interface PostDto {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnailUrl: string;
  categoryName: string;
  categorySlug: string;
  createdAt: string;
  viewCount: number;
}

interface CategoryTreeDto {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  children: CategoryTreeDto[];
}

async function getPosts(categorySlug?: string): Promise<PostDto[]> {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=20&IsPublished=true`;
    if (categorySlug) {
      url += `&CategorySlug=${categorySlug}`;
    }
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết:", error);
    return [];
  }
}

async function getCategoryTree(): Promise<CategoryTreeDto[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Categories/tree`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Lỗi lấy danh mục:", error);
    return [];
  }
}

function filterActiveCategories(
  categories: CategoryTreeDto[],
): CategoryTreeDto[] {
  return categories
    .map((cat) => {
      const newCat = { ...cat };
      if (newCat.children && newCat.children.length > 0) {
        newCat.children = filterActiveCategories(newCat.children);
        const childrenPostCountSum = newCat.children.reduce(
          (sum, child) => sum + child.postCount,
          0,
        );
        newCat.postCount += childrenPostCountSum;
      }
      return newCat;
    })
    .filter((cat) => cat.postCount > 0);
}

const CategoryNode = ({
  category,
  currentSlug,
}: {
  category: CategoryTreeDto;
  currentSlug?: string;
}) => {
  const isActive = category.slug === currentSlug;

  return (
    <li className="mb-2">
      <Link
        href={`/bai-viet?category=${category.slug}`}
        scroll={false}
        className={`flex items-center justify-between text-sm py-1.5 px-2 rounded-md transition-colors ${
          isActive
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        }`}
      >
        <span>{category.name}</span>
        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
          {category.postCount}
        </span>
      </Link>

      {category.children && category.children.length > 0 && (
        <ul className="pl-4 mt-1 border-l-2 border-gray-100 dark:border-gray-800 ml-2">
          {category.children.map((child) => (
            <CategoryNode
              key={child.id}
              category={child}
              currentSlug={currentSlug}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategorySlug = resolvedParams.category;

  const [posts, categories] = await Promise.all([
    getPosts(currentCategorySlug),
    getCategoryTree(),
  ]);

  const activeCategories = filterActiveCategories(categories);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Blog & Chia sẻ
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Nơi tôi ghi chép lại hành trình làm nghề và tư duy hệ thống.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* CỘT TRÁI (SIDEBAR) */}
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Box Danh mục bài viết */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
                Danh mục
              </h2>
              <Link
                href="/bai-viet"
                scroll={false}
                className={`block mb-4 text-sm font-medium py-1.5 px-2 rounded-md transition-colors ${
                  !currentCategorySlug
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Tất cả bài viết
              </Link>
              <ul className="space-y-1">
                {activeCategories.map((cat) => (
                  <CategoryNode
                    key={cat.id}
                    category={cat}
                    currentSlug={currentCategorySlug}
                  />
                ))}
              </ul>
            </div>

            {/* 👇 THÊM BOX QUẢNG CÁO DỌC Ở DƯỚI MENU DANH MỤC */}
            <div className="hidden md:block">
              <div className="font-bold text-gray-900 dark:text-white text-lg mb-4 border-l-4 border-blue-500 pl-3">
                Tài trợ
              </div>
              <PartnerAds position={1} />
            </div>
          </div>
        </aside>

        {/* CỘT PHẢI (DANH SÁCH BÀI VIẾT) */}
        <main className="w-full md:w-3/4">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-white dark:bg-gray-800">
              Chưa có bài viết nào...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  href={`/bai-viet/${post.slug}`}
                  key={post.id}
                  className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={
                        post.thumbnailUrl ||
                        "https://via.placeholder.com/600x400?text=No+Image"
                      }
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/90 px-3 py-1 rounded-md text-xs font-bold text-blue-600 uppercase">
                      {post.categoryName}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                      <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
                      <span>•</span>
                      <span>{post.viewCount} lượt xem</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-5 flex-1">
                      {post.summary}
                    </p>
                    <div className="text-sm font-bold text-blue-600 mt-auto flex items-center group-hover:translate-x-1 transition-transform">
                      Đọc tiếp <span className="ml-1">&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
