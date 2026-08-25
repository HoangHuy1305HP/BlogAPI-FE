import {loginService} from "@/services/authService";
import type { LoginFormValues } from "@/schemas/authSchema";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/types/Auth";



export default function useLogin() {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);
    const setAuth = useAuthStore((state) => state.setAuth);


    async function loginUser(payload: LoginFormValues) {
        try {
            setLoading(true);
            setError(null);
            const {accessToken, refreshToken} = await loginService(payload);

            const decode = jwtDecode<DecodedToken>(accessToken);
            console.log(decode)
            setAuth({id:decode.userId, name:decode.name, email:decode.email},accessToken,refreshToken)
            return true
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message)
            }
            return false
        } finally {
            setLoading(false)
        }
    }
    return {loginUser,loading,error}
}