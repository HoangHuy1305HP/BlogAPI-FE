import { Heart } from "lucide-react";
import { useLike } from "@/hooks/useLike";
import { useAuthStore } from "@/stores/authStore";

export default function LikeButton({postId,initialIsLiked,initialLikesCount, onRequireLogin}: {postId:string,initialIsLiked:boolean,initialLikesCount:number,onRequireLogin:() => void}) {
    const {isLiked,likesCount, toggleLike,error} = useLike(postId,initialIsLiked,initialLikesCount);
    const {accessToken} = useAuthStore();
    
    function handleLike() {

    console.log("handleLike chạy");
        if(!accessToken) {
            
        console.log("Chưa đăng nhập → gọi onRequireLogin");
            onRequireLogin();
            return
        }
        toggleLike()
    }
    return (
        <div>
            <div className="flex m-4 lg:flex-col gap-3 lg:justify-center lg:items-center">
                <button onClick={handleLike} className="flex items-center  ">
                <Heart className={`w-5 h-5 lg:w-[30px] lg:h-[30px ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}]`}></Heart>
                </button>
            <span className="text-lg font-semibold">{likesCount}</span>
            </div>
            
            {error && <p className="text-sm text-red-500 mt-1 p-2">{error}</p>}
        </div>
    )
}