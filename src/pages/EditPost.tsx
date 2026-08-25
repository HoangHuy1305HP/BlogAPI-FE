import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import type { Post } from "@/types/Post";
import { getPostById } from "@/services/postService";
import PostForm from "@/components/post/CreatePostForm";
export default function EditPost() {
    const {id} = useParams();
    const [post,setPost] = useState<Post|null>(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("")
    //1. render bài viết có id dc params (dùng useEffect)
    useEffect(() => {
        async function fetchPost() {
            try {
                setLoading(true);
                const res = await getPostById(id!);
                setPost(res)
            } catch (error) {
                setError("Không thể lấy bài viết")
            } finally {
                setLoading(false)
            }
        }
        if(id) {
            fetchPost()
        }
    },[id])
    return (
        <div>
            <PostForm initialData={post}></PostForm>
        </div>
    )
}