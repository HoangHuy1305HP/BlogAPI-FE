import type { Comment } from "@/types/Comment";
import { formatDate } from "@/utils/formatDate";
export default function CommentList({comments}:{comments: Comment[]}) {
    
   
    return (
        <div className="p-6">
           {comments.map((c) => {
            const avatarURL = `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.authorId}`;
            return (
                <div key={c.id} className="flex border border-gray-200 rounded-lg p-4 mb-4">
                    <img className={"w-7 h-7 object-cover rounded-full gap-2.5 "} src={avatarURL}></img>
                    <div>
                        <p className="text-xl">{c.author.name}</p>
                        <p className="">{c.content}</p>
                        <p>{formatDate(c.createdAt)}</p>
                    </div>
                </div>
            )
           })}
        </div>
    )
}