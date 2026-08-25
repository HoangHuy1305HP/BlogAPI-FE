import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import usePostFilter from "@/hooks/usePostFilter"
import { useCategories } from "@/hooks/useCategories";
import PostCard from "@/components/post/PostCard";
import SidebarLeft from "@/components/layout/SidebarLeft";
import SidebarRight from "@/components/layout/SidebarRight";

export default function PostsFilterPage() {
    const { allCategories } = useCategories();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const categoryId = searchParams.get("categoryId") ?? undefined;
    const tagId = searchParams.get("tagId") ?? undefined;

    const { posts, loading, error } =
        usePostFilter(page, categoryId, tagId);

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        setSearchParams(params);
    };

    if (loading) {
        return <p>Đang tải...</p>;
    }

    if (error) {
        return <p>Đã xảy ra lỗi</p>;
    }

    return (
        <div>
            <main className="flex flex-col lg:flex-row lg:mx-18 p-2 gap-6">

                {/* Sidebar trái */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <SidebarLeft allCategories={allCategories} />
                </aside>

                {/* Danh sách bài viết */}
                <div className="flex-1 flex flex-col items-center">
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))}

                    {posts.length === 0 && (
                        <p className="text-gray-500 py-10">
                            Không tìm thấy bài viết.
                        </p>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-4 py-6">
                        <button
                            onClick={() => goToPage(page - 1)}
                            disabled={page === 1}
                            className="p-2 rounded-full border disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="size-4" />
                        </button>

                        <span className="text-sm text-gray-600">
                            Trang {page}
                        </span>

                        <button
                            onClick={() => goToPage(page + 1)}
                            disabled={posts.length < 10}
                            className="p-2 rounded-full border disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Sidebar phải */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <SidebarRight />
                </aside>

            </main>
        </div>
    );
}