import {registerService} from "@/services/authService";
import type { RegisterFormValues } from "@/schemas/authSchema";
import { useState } from "react";



export default function useRegister() {
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    

    async function registerUser(data:RegisterFormValues) {
        try {
            setLoading(true);
            setError(null);
            await registerService(data);
            return true
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
                return false
            }
        } finally {
            setLoading(false)
        }
    }
    return {registerUser,loading,error}
}