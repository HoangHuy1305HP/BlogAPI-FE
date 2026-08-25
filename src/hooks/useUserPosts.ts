import { getUserPost } from "@/services/userService";
import { useFetch } from "./useFetch";
import type { Post } from "@/types/Post";
export default function useUserPosts({id}:{id?:string}) {
    const {data,loading,error} = useFetch<Post[]>(() => getUserPost({id}),[id] );
    return {posts: data ?? [], loading, error}
}