import type { Tag } from "@/types/Tag";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getTags(): Promise<Tag[]> {
    const res = await fetch(`${BASE_URL}/tags/`);
    if(!res.ok) throw new Error("failed to fetch posts");
    const tags  = await res.json();
    const result = tags.result;
    return result;
}