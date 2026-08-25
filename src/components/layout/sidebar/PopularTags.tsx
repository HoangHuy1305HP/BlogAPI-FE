import { useTags } from "@/hooks/useTags";
import { Link } from "react-router-dom";
function PopularTags() {
    const {tags, loading,error} = useTags();

    return (
       <div>
        <h3 className="font-bold text-lg mb-3">Popular Tags</h3>
        <ul className="max-h-64 overflow-y-auto flex flex-col gap-2">
            {tags.map((tag) => (
                <Link to={`/posts?tagId=${tag.id}`}>
                    <li key={tag.id} className="text-gray-600 hover:text-blue-500 cursor-pointer py-2 mx-2">#{tag.name}</li>  
                </Link>
                  
            ))}
        </ul>
       </div>
    )

}

export default PopularTags