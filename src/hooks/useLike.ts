import { useState } from "react"
import { useAuthStore } from "@/stores/authStore";
import { likePost, unlikePost } from "@/services/postService";

export function useLike(postId:string, initialIsLiked:boolean, initialLikesCount:number) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likesCount,setLikesCount] = useState(initialLikesCount);
    const [error, setError] = useState<string | null>(null);
    const accessToken = useAuthStore((state) => state.accessToken);

    async function toggleLike() {
        //1. Kiểm tra token
        if(!accessToken) {
            setError("Bạn cần đăng nhập");
            return
        }

        //2. Lưu lại giá trị ban đầu, nếu có lỗi rollback
        const previousIsLiked = isLiked;
        const previousLikesCount = likesCount;

        //3. Cập nhật ngay (optimistic skill)
        if(isLiked) {
            setIsLiked(false);
            setLikesCount(likesCount - 1)
        } else {
            setIsLiked(true);
            setLikesCount(likesCount + 1)
        }
        //4. Call API
        try {
            if(previousIsLiked) {
                await unlikePost(postId,accessToken)
            } else {
                await likePost(postId,accessToken)
            }
        } catch (error) {
             setIsLiked(previousIsLiked);
              setLikesCount(previousLikesCount);
            if (error instanceof Error) setError(error.message);
            }
        
    }
    return {isLiked, likesCount,toggleLike, error}
}