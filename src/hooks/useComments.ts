import { useEffect, useState} from "react";
import { useFetch } from "./useFetch";
import type { Comment } from "@/types/Comment";
import { getComments,createComment } from "@/services/commentService";
import { useAuthStore } from "@/stores/authStore";

export function useComments(postId:string) {
    console.log("useComments:", postId);
    const [comments,setComments] = useState<Comment[]>([]);
    const accessToken = useAuthStore((state) => state.accessToken);
    const {data,loading,error} = useFetch(() => getComments(postId),[postId])
        
    useEffect(() => {
        if(data) {
            setComments(data)
        }
    },[data])
    async function createNewComment(content:string) {
        if(!accessToken) {
                    return false
        } else {
            const newComment = await createComment(postId,content,accessToken);
            setComments(prev => [...prev,newComment])
            return newComment
        }
        
    }
    return {comments,loading,error,createNewComment}
}