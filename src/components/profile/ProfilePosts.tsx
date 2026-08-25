import useUserPosts from "@/hooks/useUserPosts"
import type { Post } from "@/types/Post";
import PostCard from "../post/PostCard";
export default function ProfilePosts({posts}: {posts: Post[]}) {
    
    return (
    <div className="flex-1 flex flex-col gap-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
    </div>
    )
}