import type { Post } from "@/types/Post";
import { useFetch } from "./useFetch";
import { getPostFilter } from "@/services/postService";
export default function usePostFilter(
    page: number,
    categoryId?: string,
    tagId?: string
) {
    const { data, loading, error } = useFetch<Post[]>(
        () => getPostFilter(page, categoryId, tagId),
        [page, categoryId, tagId]
    );

    return {
        posts: data ?? [],
        loading,
        error
    };
}