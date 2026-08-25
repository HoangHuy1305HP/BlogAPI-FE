import { getUserProfile } from "@/services/userService";
import type { UserProfile } from "@/types/User";
import { useFetch } from "./useFetch";
export default function useUserProfile({id}:{id?:string}) {
    if(!id) {
        return {
            user:null,
            loading:false,
            error:"Không tìm thấy Id người dùng"
        }
    }
    const {data,loading,error} = useFetch<UserProfile>(() => getUserProfile({id}),[id]);
    return {user: data, loading,error}
}