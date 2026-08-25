
import { useState } from "react";
import { Button } from "../ui/button";
export default function CommentForm({onSubmit}:{onSubmit: (content: string) => Promise<void>}) {
    const [content,setContent] = useState("");
    function handleSubmit(e:React.SubmitEvent) {
        console.log("Content:",content)
        e.preventDefault();
        onSubmit(content);
        setContent("")
    }
    return (
        <form onSubmit={handleSubmit} className="p-3">
            <textarea className={"p-2 border-2 border-gray-300 w-full h-24  "} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Viết bình luận của bạn..."></textarea>
            <Button type="submit">Bình luận</Button>
        </form>
    )
}