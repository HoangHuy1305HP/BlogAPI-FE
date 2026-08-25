import { deletePost } from "@/services/postService";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

export default function useDeletePost({postId}:{postId:string}) {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const {accessToken} = useAuthStore();

    async function deletePostAction() {
        try {
            setLoading(true);
            if(!accessToken) {
                return false
            }
            await deletePost(postId,accessToken)
        } catch (error) {
           if(error instanceof Error) {
                setError(error.message)
            }
            return false
        }
        finally {
            setLoading(false)
        }
        return true
    }
    return {loading,error,deletePostAction}
}