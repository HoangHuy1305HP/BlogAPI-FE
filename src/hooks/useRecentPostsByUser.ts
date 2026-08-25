import { getRecentPostsByUser } from "@/services/postService";
import { useFetch } from "./useFetch";


export default function useRecentPostsByUser(postId:string) {
    const {data,loading,error} = useFetch(() => getRecentPostsByUser(postId), [postId] )
    return {posts: data,loading,error}
}