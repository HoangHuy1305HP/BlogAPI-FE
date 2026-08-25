import { useFetch } from "./useFetch";
import { getPost, getRecentPosts } from "@/services/postService";
import type { Post, PostResult } from "@/types/Post";

export function usePosts(page:number,categoryId?:string,tagId?:string) {
    const {data,loading,error} = useFetch<Post[]>(() => getPost(page,categoryId,tagId),[page,categoryId,tagId]);
    return {posts: data ?? [],loading,error}
}

export function useRecentPosts() {
    const {data,loading,error} = useFetch<Post[]>(() => getRecentPosts(), []);
    return {recentPost: data ?? [],loading,error}
}