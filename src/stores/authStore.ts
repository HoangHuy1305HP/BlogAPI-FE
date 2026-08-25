import {create} from 'zustand';
import type { User } from "@/types/User";
type AuthState = {
    currentUser: User | null,
    accessToken: string | null,
    refreshToken: string | null,
    setAuth:(user:User, accessToken: string,refreshToken:string) => void;
    logout: () => void
}
export const useAuthStore = create<AuthState>((set) => ({
    // 1.state
    currentUser: null,
    accessToken: null,
    refreshToken:null,
    // 2. action 
    setAuth:(user,token1,token2) => set({currentUser: user, accessToken: token1,refreshToken:token2}),
    logout: () => set({currentUser:null, accessToken:null,refreshToken:null})
}))
