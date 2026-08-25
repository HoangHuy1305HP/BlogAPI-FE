
import LikeButton from "./LikeButton";
import type { Post } from "@/types/Post";
import { MessageCircle } from "lucide-react";
import { Share2 } from "lucide-react";
export default function PostActionBar({post,onRequireLogin,commentCounts}:{post:Post,onRequireLogin:() => void,commentCounts: number}) {
    async function handleShare() {
        await navigator.clipboard.writeText(window.location.href);
    }


    
    return(
        <div>
            <div className="flex flex-col gap-10 justify-center items-center"  >
                <LikeButton postId={post.id} initialIsLiked={post.isLiked} initialLikesCount={post._count.like} onRequireLogin={onRequireLogin}></LikeButton>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <MessageCircle className="size-35px"></MessageCircle>
                    <span>{commentCounts}</span>
                </div>

                <div className="flex flex-col gap-3 items-center justify-center">
                    <button type="button" onClick={handleShare}><Share2 className="size-35px"></Share2></button>
                    <span>Share</span>
                </div>
                
                
            </div>
            
             
        </div>
       
    )
}