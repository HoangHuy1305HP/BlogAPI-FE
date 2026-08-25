import { searchPosts } from "@/services/postService";
import { useFetch } from "./useFetch";

export default function useSearchHook(page:number,search:string,limit:number = 10)  {
    const {data,loading,error} = useFetch(() => searchPosts(page,search,limit), [page,search]);
    return {posts:data?.posts ?? [],total:data?.total ?? 0,loading,error}
}