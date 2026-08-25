import type { Category } from "@/types/Category";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories/allCategories`);
    if(!res.ok) throw new Error("failed to fetch category");
    const categories = await res.json();
    const result = categories.result;
    return result;
}