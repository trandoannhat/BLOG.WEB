// app/blog/page.tsx
import dayjs from "dayjs";
import Link from "next/link";

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

interface CategoryTreeDto {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  children: CategoryTreeDto[];
}

async function getPosts(categoryId?: string): Promise<PostDto[]> {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/Posts?PageSize=20&IsPublished=true`;
    if (categoryId) {
      url += `&CategoryId=${categoryId}`;
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

// 👇 ĐÃ THÊM: Hàm lọc đệ quy để giấu danh mục trống
function filterActiveCategories(
  categories: CategoryTreeDto[],
): CategoryTreeDto[] {
  return (
    categories
      .map((cat) => {
        // Tạo một bản sao để không làm hỏng dữ liệu gốc
        const newCat = { ...cat };
        // Nếu có danh mục con, gọi đệ quy để lọc con trước
        if (newCat.children && newCat.children.length > 0) {
          newCat.children = filterActiveCategories(newCat.children);
        }
        return newCat;
      })
      // Cuối cùng, chỉ giữ lại danh mục nếu nó có bài viết, HOẶC bên trong nó có danh mục con có bài viết
      .filter(
        (cat) => cat.postCount > 0 || (cat.children && cat.children.length > 0),
      )
  );
}

const CategoryNode = ({
  category,
  currentCatId,
}: {
  category: CategoryTreeDto;
  currentCatId?: string;
}) => {
  const isActive = category.id === currentCatId;

  return (
    <li className="mb-2">
      <Link
        href={`/blog?categoryId=${category.id}`}
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
              currentCatId={currentCatId}
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
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategoryId = resolvedParams.categoryId;

  const [posts, categories] = await Promise.all([
    getPosts(currentCategoryId),
    getCategoryTree(),
  ]);

  // 👇 ĐÃ THÊM: Sử dụng hàm lọc để lấy ra các danh mục hợp lệ
  const activeCategories = filterActiveCategories(categories);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Blog & Chia sẻ
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Nơi tôi ghi chép lại hành trình làm nghề, những kinh nghiệm thực chiến
          về lập trình Backend, Frontend và Tư duy hệ thống.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24 transition-colors">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
              Danh mục bài viết
            </h2>

            <Link
              href="/blog"
              scroll={false}
              className={`block mb-4 text-sm font-medium py-1.5 px-2 rounded-md transition-colors ${
                !currentCategoryId
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Tất cả bài viết
            </Link>

            <ul className="space-y-1">
              {/* 👇 ĐÃ SỬA: Map qua mảng activeCategories đã được lọc */}
              {activeCategories.map((cat) => (
                <CategoryNode
                  key={cat.id}
                  category={cat}
                  currentCatId={currentCategoryId}
                />
              ))}
            </ul>
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
              Chưa có bài viết nào trong danh mục này...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                >
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-b border-gray-100 dark:border-gray-700">
                    <img
                      src={
                        post.thumbnailUrl ||
                        "https://via.placeholder.com/600x400?text=No+Image"
                      }
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/90 px-3 py-1 rounded-md text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm uppercase tracking-wide">
                      {post.categoryName}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 font-medium mb-3 gap-2">
                      <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
                      <span>•</span>
                      <span>{post.viewCount} lượt xem</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-5 flex-1 leading-relaxed">
                      {post.summary}
                    </p>

                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto flex items-center group-hover:translate-x-1 transition-transform">
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
