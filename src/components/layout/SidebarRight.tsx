import RecentPost from "./sidebar/RecentPost";
import PopularTags from "./sidebar/PopularTags";
export default function SidebarRight() {

    return (
        <div className="mb-2">
            <PopularTags></PopularTags>
            <RecentPost></RecentPost>
            
        </div>
        
    )
}