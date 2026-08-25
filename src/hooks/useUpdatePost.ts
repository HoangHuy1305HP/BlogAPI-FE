import { useAuthStore } from "@/stores/authStore";
import { getPostById, updatePost } from "@/services/postService";
import { useState } from "react";
import type { UpdatePostPayload } from "@/types/Post";
import { generateSlug } from "@/utils/generateSlug";
export default function useUpdatePost({postId}: {postId:string}) {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const accessToken = useAuthStore((state) => state.accessToken);

    async function updatePostAction(formData: Omit<UpdatePostPayload,"slug"|"published">, published:boolean) {
        try {
            setLoading(true);
             const slug = generateSlug(formData.title);
             if(!accessToken) {
                setError("Bạn cần đăng nhập để tạo bài viết")
                return false
            }
            await updatePost(postId,{...formData,slug,published},accessToken)
            return true
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message)
            }
            return false
    }
        finally {setLoading(false)}
       
    }
     return {loading,error,updatePostAction}
}