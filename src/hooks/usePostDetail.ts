import { useFetch } from "./useFetch";
import { getPostById } from "@/services/postService";
import { useAuthStore } from "@/stores/authStore";
import type { Post } from "@/types/Post";
export function usePostDetail(id:string) {
    const accessToken = useAuthStore((state) => state.accessToken) ?? undefined;
    const {data,loading,error} = useFetch<Post>(() => getPostById(id,accessToken),[id,accessToken]);
    return {post: data,loading,error}
}