import type { LoginFormValues, RegisterFormValues } from "@/schemas/authSchema";
import type { LoginResponse } from "@/types/Auth";
import type { RegisterResponse } from "@/types/Auth";
const BASE_URL = import.meta.env.VITE_API_URL;

export async function registerService(payload: RegisterFormValues): Promise<RegisterResponse> {
    const res = await fetch(`${BASE_URL}/auth/register`,{
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload)   
    });
    if(!res.ok) throw new Error("Failed to fetch");
    const data = await  res.json();
    const result = data.newUser;
    return result
}


export async function loginService(payload: LoginFormValues): Promise<LoginResponse> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                            method:"POST",
                            headers: { "Content-Type": "application/json" },
                            body:JSON.stringify(payload)
    });
    
    const data = await res.json();
    if(!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;
    return {accessToken,refreshToken}
}