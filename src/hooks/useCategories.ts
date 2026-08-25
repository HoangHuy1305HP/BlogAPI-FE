import { useFetch } from "./useFetch";
import { getCategories } from "@/services/categoryService";
import type { Category } from "@/types/Category";

export function useCategories() {
    const {data,loading,error} = useFetch<Category[]>(() => getCategories(),[]);
    return {allCategories: data ?? [],loading, error }
}