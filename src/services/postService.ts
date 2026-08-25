import type { CreatePostPayload, Post, PostResult, RecentPost, UpdatePostPayload } from "@/types/Post";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPost(page: number, search:string = "",categoryId?:string,tagId?:string): Promise<Post[]> {
    const params = new URLSearchParams();

    params.set("page",String(page));
    if(search) {
        params.set("search",search)
    }
    if(categoryId) {
        params.set("categoryId",categoryId)
    }
    if(tagId) {
        params.set("tagId",tagId)
    }
    const res = await fetch(`${BASE_URL}/posts?${params}`);
    if(!res.ok) throw new Error("failed to fetch posts");
    const posts = await res.json();
    const result = posts.data;
    return result;
}

export async function getPostFilter(page:number,categoryId?:string,tagId?:string):Promise<Post[]> {
     const params = new URLSearchParams();

      params.set("page", String(page));
       if (categoryId) {
        params.set("categoryId", categoryId);
        }
        if (tagId) {
            params.set("tagId", tagId);
        }
        const res = await fetch(`${BASE_URL}/posts?${params}`);
        if (!res.ok) {
            throw new Error("Không thể lấy bài viết");
        }

        const data = await res.json();

        return data.data;


}

export async function getRecentPosts():Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/posts/recent`);
    if(!res.ok) throw new Error("failed to fetch posts");
    const recentPosts = await res.json();
    const result = recentPosts.posts;
    return result;
}

export async function getRecentPostsByUser(postId:string):Promise<RecentPost[]> {
    const res = await fetch(`${BASE_URL}/posts/recent/${postId}`);
    if(!res.ok) throw new Error("failed to fetch posts");
    const recentPosts = await res.json();
    const result = recentPosts.posts;
    return result
}


export async function createPostForms(payload:CreatePostPayload, accessToken:string): Promise<Post> {
    //1. fetch tới API 
    const res = await fetch(`${BASE_URL}/posts/`, {
        method:"POST",
        headers: {
            "Content-type":"application/json",
            "Authorization":`Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    const result = data.result;
    return result
    
}

export async function updatePost(postId:string,payload:UpdatePostPayload,accessToken:string): Promise<Post> {
    const res = await fetch(`${BASE_URL}/posts/${postId}`,{
        method:"PUT",
         headers: {
            "Content-type":"application/json",
            "Authorization":`Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    const result = data.result;
    return result
}

export async function deletePost(postId:string,accessToken:string) {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-type":"application/json",
            "Authorization":`Bearer ${accessToken}`
        }
    })
    if(!res.ok) {
        throw new Error("Xóa bài viết thất bại") 
    }
    return true;
}
export async function getPostById(id:string,accessToken?:string): Promise<Post> {
    //.1 fetch tới api
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        headers: accessToken ? {Authorization: `Bearer ${accessToken}`} : {}
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.message || "Không tìm thấy bài viết")
    
    const result = data.result;
    return result;
}

export async function likePost(postId:string,accessToken:string) :Promise<void> {
    const res = await fetch(`${BASE_URL}/posts/${postId}/like`,{
        method:"POST",
        headers: {Authorization: `Bearer ${accessToken}`}
    })
    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
}

export async function unlikePost(postId:string,accessToken:string): Promise<void> {
    const res = await fetch(`${BASE_URL}/posts/${postId}/like`,{
        method:"DELETE",
        headers: {Authorization: `Bearer ${accessToken}`}
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
}

export async function searchPosts(page:number,search:string,limit:number = 10): Promise<PostResult> {
    const res = await fetch( `${BASE_URL}/posts/search?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
    if(!res.ok) throw Error("Không thấy bài viết");
    const data = await res.json();
    const result = data.posts;
    return result
}