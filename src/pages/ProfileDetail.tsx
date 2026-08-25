import useUserProfile from "@/hooks/useUserProfile";
import { useParams } from "react-router-dom"
import ProfileCard from "@/components/profile/ProfileCard";
import ProfilePosts from "@/components/profile/ProfilePosts";
import useUserPosts from "@/hooks/useUserPosts";
export default function ProfileDetail() {
    const {id} = useParams();
    const {user,loading,error} = useUserProfile({id})
    const {posts,loading:Postloading,error:PostError} = useUserPosts({id})

    return (
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto px-4 lg:items-start lg:mt-8">
            {user && <ProfileCard user={user} />}
            {user && <ProfilePosts posts={posts} />}
        </div>
    )
}