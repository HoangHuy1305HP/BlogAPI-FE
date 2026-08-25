import type { Post } from "@/types/Post"
import { formatDate } from "@/utils/formatDate";
import CommentSection from "../comment/CommentSection";
import LikeButton from "./LikeButton";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function PostDetailView({post,onRequireLogin,onCommentCreated}:{post:Post,onRequireLogin:() => void,onCommentCreated:() => void}) {
    const avatarURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`;
    const {currentUser} = useAuthStore()
   
    return (
        <div className="lg:max-w-4xl mx-auto bg-white" >
            {post.coverImage ? (
                <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover"></img>
            ):<></>}
                <Link to={`/profile/${post.authorId}`}>
                <div className="flex items-center mx-3 p-1 gap-2 ">
                                    <img src={avatarURL} alt={post.author.name} className="w-10 h-10 md:w-8 md:h-8 object-cover rounded-full"/>
                                    <div>
                                        <p className="text-base md:text-sm font-medium">{post.author.name}</p>
                                        <p className="text-[10px] md:text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                                    </div>
                    </div>
                    </Link>
             

                <div className="mx-2 lg:hidden">
                    <LikeButton postId={post.id} initialIsLiked={post.isLiked} initialLikesCount={post._count.like} onRequireLogin={onRequireLogin}></LikeButton>
                </div> 
                

                <h1 className={"font-bold text-xl m-5 lg:text-4xl"}>{post.title}</h1>
                <span className={"m-5 border rounded-md px-2 py-1"}>#{post.category?.name}</span>
                

                <div className="max-w-4xl   leading-relaxed m-4 text-base lg:text-lg ">
                    <p className="whitespace-pre-line">{post.content}</p>
                </div>

                <div className="border-t mt-8 pt-6">
                    <CommentSection postId={post.id} onRequireLogin={onRequireLogin} onCommentCreated={onCommentCreated}></CommentSection>
                </div>

                
        </div>
    )

}