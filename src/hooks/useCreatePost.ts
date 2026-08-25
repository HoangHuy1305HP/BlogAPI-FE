
    import { useAuthStore } from "@/stores/authStore";
    import { generateSlug } from "@/utils/generateSlug";
    import { useState } from "react";
    import { createPostForms } from "@/services/postService";
    import type { CreatePostPayload } from "@/types/Post";

    export function useCreatePost() {
        const [loading,setLoading] = useState(false);
        const [error,setError] = useState<string|null>(null)
        const accessToken = useAuthStore((state) => state.accessToken);

        async function createPostAction(formData: Omit<CreatePostPayload,"slug"|"published">, published:boolean) {
            try {
                setLoading(true)
                const slug = generateSlug(formData.title);
                if(!accessToken) {
                    setError("Bạn cần đăng nhập để tạo bài viết")
                    return false
                }
                await createPostForms({...formData,slug,published}, accessToken);
                return true

            } catch (error) {
                if(error instanceof Error) {
                    setError(error.message)
                    
                }
                return false
            }
            finally {
                setLoading(false)
            }
        }
        return {createPostAction,loading,error}
    }