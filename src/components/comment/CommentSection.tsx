import { useComments } from "@/hooks/useComments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useAuthStore } from "@/stores/authStore";
export default function CommentSection({postId, onRequireLogin,onCommentCreated}: {postId:string,onRequireLogin: () => void,onCommentCreated: () => void}) {
    console.log("SECTION postId =", postId);
    const {comments,loading,error,createNewComment}  =  useComments(postId);
    const {accessToken} = useAuthStore()
    async function checkLogin(content:string) {
        if(!accessToken) {
            onRequireLogin();
            return;
            
        }
        else {
            await createNewComment(content)
            onCommentCreated();
        }
        
    }
    return (
        <div>
            {loading && <p>Đang tải...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <CommentForm onSubmit={checkLogin}  ></CommentForm>
            <CommentList comments={comments}></CommentList>
        </div>
    )

}