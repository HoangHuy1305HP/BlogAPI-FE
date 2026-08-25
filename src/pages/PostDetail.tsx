import {useParams} from  "react-router-dom";
import { usePostDetail } from "@/hooks/usePostDetail";
import PostDetailView from "@/components/post/PostDetailView"
import AuthorSidebar from "@/components/post/AuthorSidebar";
import PostActionBar from "@/components/post/PostActionBar";
import { useEffect, useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useDeletePost from "@/hooks/useDeletePost";
import { useNavigate } from "react-router-dom";
export function PostDetail() {
    const {id} = useParams();
    
    const [showLogin, setShowLogin] = useState(false);
    const {post,loading,error} = usePostDetail(id as string);
    const [commentCounts, setCommentCounts] = useState(0);
    useEffect(() => {
        if(post) {
            setCommentCounts(post._count.comments)
        }
    },[post])
    const postId = post?.id as string
    const {deletePostAction} = useDeletePost({postId})
    const {currentUser} = useAuthStore();
    const navigate = useNavigate()
    if(loading) {
        return <p>Đang tải bài viết...</p>
    }
    if(error || !post) {
        return <p>Không tìm thấy bài viết</p>
    }
    // dùng để đóng
    function handleCloseLogin() {
        setShowLogin(false);
    }
    // dùng để mở
    function handleRequireLogin() {
        setShowLogin(true);
    }


    return (
    <div className="bg-gray-100 min-h-[calc(100vh-54px)]">
        <div className="pt-8">
            <div className="max-w-7xl mx-auto flex">
                
                    <aside className="hidden lg:block w-24">
                        {currentUser?.id === post.authorId && (
                            <div>
                                <Link to={`/posts/${post.id}/edit`}>
                                <Button className="mt-6 size-12 ml-3">
                                    Sửa
                                </Button>
                            </Link>
                            
                        <Button className="mt-6 size-12 ml-3 p-5" onClick={async () => {
                            const confirm = window.confirm("Bạn có chắc muốn xóa bài viết này");
                            if(!confirm) return;
                            const result = await deletePostAction();
                            if(result) {
                                navigate("/")
                            }
                        }}>Xóa</Button>
                            </div> )}
                    <div className=" w-full sticky top-14 flex mt-20 mr-10 ">
                        
                        <PostActionBar post={post} commentCounts={commentCounts} onRequireLogin={handleRequireLogin}  />
                        
                    </div>
                </aside>
                

            
            <main className="flex-1">
                <PostDetailView post={post} onRequireLogin={handleRequireLogin} onCommentCreated={() => setCommentCounts((prev) => prev + 1)} />
            </main>

           
            <aside className="hidden lg:block w-72">
                <Link to={`/profile/${post.authorId}`}>
                <div>
                    <AuthorSidebar postId={post.id} />
                </div>
                </Link>
                
            </aside>
            </div>
           
           {showLogin && <LoginModal onClose={handleCloseLogin}></LoginModal>} 
        </div>
        
    </div>
);
}