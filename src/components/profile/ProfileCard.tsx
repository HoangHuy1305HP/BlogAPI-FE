import { useAuthStore } from "@/stores/authStore";
import type { UserProfile } from "@/types/User";
import { formatDate } from "@/utils/formatDate";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
export default function ProfileCard({user}:{user: UserProfile}) {
    const avatarURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;
    const {currentUser} = useAuthStore()

    return (
       <div className="flex flex-col lg:w-72 lg:shrink-0 lg:sticky lg:top-20">
            <div className="flex flex-col lg:rounded-xl lg:border lg:bg-white p-6 lg:shadow-sm justify-center items-center gap-3">
                <img src={avatarURL} className="w-20 h-20 rounded-full bg-amber-300 object-cover" alt={user.name} />
                <p className="text-lg font-semibold">{user.name}</p>
                {user.createdAt && <p className="text-sm text-gray-500">Ngày tham gia: {formatDate(user.createdAt)}</p> }
                
                {user.bio ? (
                <p className="text-sm text-gray-600 mt-2 wrap-break-words max-w-xs">Tiểu sử: {user.bio}</p>
                ) : (
                <p className="text-sm text-gray-400 italic">Không có tiểu sử về người dùng</p>
                
                )}
            </div>
            {currentUser?.id === user.id && (
                <Link to={"/profile/edit"}>
                    <Button className={"p-4 mt-5 mx-auto"}>Edit</Button>
                </Link>
               
            )}


        </div>
    )
}