import useSearchHook from "@/hooks/useSearchHook"
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
export default function SearchPreview({search,onClose}:{search:string,onClose:() => void}) {
    const {posts,loading,error} = useSearchHook(1,search,5);
    const navigate = useNavigate();
    function handleClick(id:string) {
        navigate(`/posts/${id}`)
    }
    return (
        <div className="relative">
            <Button type="button" onClick={onClose} className={" absolute righ-2.5 top-3.5"}>X</Button>
            <div className=" flex flex-col absolute lg:w-100 lg:top-4.5 lg:right-1    mt-1 bg-white rounded-lg border shadow-lg overflow-hidden z-50">
                {posts.length > 0 ? (posts.map((post) => (
                    <div className="flex h-15 justify-center items-center text-center w-50 lg:w-full p-2 border-b" onClick={() => handleClick(post.id)}>{post.title}</div>)
                )) : 
                    <p className="flex justify-center p-2" >Không tìm thấy bài viết</p>}
            </div>

        </div>
    )
}