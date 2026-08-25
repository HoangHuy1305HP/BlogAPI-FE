import PostCard from "@/components/post/PostCard";
import useSearchHook from "@/hooks/useSearchHook";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("q") ?? "";
    const page = Number(searchParams.get("page")) || 1;
    const {posts,total,loading,error} = useSearchHook(page,search);
    const totalPages = Math.ceil(total/10)

    return (
        <div>
            <h1 className="flex justify-center items-center m-10 font-bold text-lg lg:text-2xl">Kết quả tìm kiếm</h1>
            {posts.map((p) => (
                <PostCard key={p.id} post={p} ></PostCard>
            ))}
           <div className="flex justify-center gap-4 my-6">
                <button disabled={page===1} onClick={() => setSearchParams({q:search,page:String(page-1)})} className="px-4 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed, disabled:hover:bg-white">Previous</button>
                <button disabled={page===totalPages || totalPages === 0   } onClick={() => setSearchParams({q:search,page:String(page+1)})} className="px-4 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed, disabled:hover:bg-white" >Next</button>
            </div>
        </div>
    )
}