import { useFetch } from "./useFetch";
import type { Tag } from "@/types/Tag";
import { getTags } from "@/services/tagService";
export function useTags() {
    const {data,loading,error} = useFetch<Tag[]>(() => getTags(), []);
    return {tags:data ?? [],loading,error}
}