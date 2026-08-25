import type { Post } from "@/types/Post";
import { Card } from "../ui/card";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router-dom";
function PostCard({ post }: { post: Post }) {
    const avatarURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`;
    const navigate = useNavigate()
    function handlePostClick() {
        navigate(`/posts/${post.id}`)
    }
    
    return (
        <div className="flex items-center justify-center" onClick={handlePostClick}>
            <Card className="max-w-2xl w-screen flex m-1 md:m-2 flex-col">
                {post.coverImage && (
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-32 md:h-48 object-cover rounded-t-lg"
                    />
                )}
                <div className="flex items-center mx-1 p-1 gap-2">
                    <img
                        src={avatarURL}
                        alt={post.author.name}
                        className="w-7 h-7 md:w-8 md:h-8 object-cover rounded-full"
                    />
                    <div>
                        <p className="text-xs md:text-sm font-medium">{post.author.name}</p>
                        <p className="text-[10px] md:text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
                </div>

                <h1 className="text-base md:text-2xl font-bold px-0.5 mx-3 md:mx-6">
                    {post.title}
                </h1>

                {post.category && (
                    <span className="text-xs md:text-sm px-0.5 mx-3 md:mx-6">
                        {`#${post.category.name}`}
                    </span>
                )}

                <div className="flex gap-3 md:gap-4 text-xs md:text-sm text-gray-500 px-0.5 mx-3 md:mx-6 mb-2">
                    <span>❤️ {post._count.like} likes</span>
                    <span>💬 {post._count.comments} comments</span>
                </div>
            </Card>
        </div>
    )
}
export default PostCard