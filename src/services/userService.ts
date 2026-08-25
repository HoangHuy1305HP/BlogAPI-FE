import { useAuthStore } from "@/stores/authStore";



const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile({id}:{id:string}) {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    if(!res.ok) throw new Error("Không thể lấy người dùng");
    const user = await res.json();
    const result = user.user;
    return result
}

export async function getUserPost({id}:{id?:string}) {
    const res = await fetch(`${BASE_URL}/users/${id}/posts`);
    if(!res.ok) throw new Error("Không thấy bài viết");
    const posts = await res.json();
    const result = posts.posts;
    return result

}

export async function updateProfile({name,bio}:{name:string,bio:string}) {
    const token = useAuthStore.getState().accessToken;
    const res = await fetch(`${BASE_URL}/users/profile`,
        {
            method:"PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
            body: JSON.stringify({ name, bio }),
        }
    )
    if(!res.ok) throw new Error("Không thể cập nhật");
    const user = await res.json();
    const result = user.user;
    return result;
}