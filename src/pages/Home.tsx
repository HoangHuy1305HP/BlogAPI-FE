import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import PostCard from "@/components/post/PostCard";
import SidebarLeft from "@/components/layout/SidebarLeft";
import SidebarRight from "@/components/layout/SidebarRight";

function Home() {
    const { allCategories, loading: loadingCategories, error: errorCategories } = useCategories();
    const [page, setPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { posts, loading, error } = usePosts(page);
    return (
        <div className="">
            
             
             
            <main className="flex flex-col lg:flex-row  lg:mx-18 p-2 gap-6">
                <aside className="hidden lg:block w-64 shrink-0">
                    <SidebarLeft allCategories={allCategories}></SidebarLeft>
                    
                    
                </aside>
                <div className="flex-1 flex flex-col items-center">
                    {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                    ))}
                    <div className="flex items-center justify-center gap-4 py-6">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-full border disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm text-gray-600">Trang {page}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={posts.length < 10}
                    className="p-2 rounded-full border disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="size-4" />
                </button>
                </div>
                </div>
                <aside className="hidden lg:block w-72 shrink-0">
                    <SidebarRight />
                </aside>
                
            </main>
                 
            
        </div>
        
    
)
           
}

export default Home