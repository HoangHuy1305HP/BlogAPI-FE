/*  Trong thẻ này chúng ta sẽ có:
-  profile của user (chưa làm)
- các bài viết gần nhất của user (đã làm)
*/
import { Link } from "react-router-dom";
import useRecentPostsByUser from "@/hooks/useRecentPostsByUser";
import { usePostDetail } from "@/hooks/usePostDetail";

export default function AuthorSidebar({postId}:{postId:string}) {
    const {posts,loading,error} = useRecentPostsByUser(postId);
    const {post,error:PostError} = usePostDetail(postId);
    if(!post) {
       return PostError
    }
    const avatarURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`;
    return(
        <div>
            <aside>
                <div className="bg-white rounded-xl p-5 mb-6 mx-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Profile
                        </p>

                        <div className="flex flex-col items-center mt-4">
                            <img
                                src={avatarURL}
                                alt={post.author.name}
                                className="w-20 h-20 rounded-full object-cover"
                            />

                            <h3 className="mt-3 text-lg font-bold text-center">
                                {post.author.name}
                            </h3>
                        </div>

                        <div className="border-t border-gray-200 mt-5 pt-4">
                            <p className="text-sm text-gray-600 leading-relaxed text-center">
                                {post.author.bio || "Chưa có giới thiệu."}
                            </p>
                        </div>
                </div>
                
                
                <h3 className="mx-5 font-semibold">More From Authors</h3>
                {loading && <p className="text-red-500">Đang tải...</p> }
                {error && <p className="text-red-500">Xảy ra lỗi</p> }
                {posts?.map((p) => (
                    <Link to={`/posts/${p.id}` } key={p.id}>
                    <div className=" mx-5 border bg-white  " >
                        <div className="p-4">
                            <h3 className={"text-lg font-bold"}>{p.title}</h3>
                            <p>#{p.tags.map((t) => t.name)}</p>
                        </div>
                        
                    </div>
                    </Link>
                    
                    
                    
                ))}
            </aside>
        </div>
    )
}