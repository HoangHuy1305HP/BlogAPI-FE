import {X} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
export default function LoginModal({onClose,}: {onClose: () => void}) {
    return (
         <div className="fixed inset-0 z-50 bg-white lg:bg-black/60 lg:flex lg:items-center lg:justify-center">
            <div className="w-full bg-white lg:max-w-xl lg:rounded-xl lg:shadow-2xl lg:overflow-hidden">
                <header className="flex items-center justify-between border-b px-5 py-4">
                <h2>Log in to continue</h2>
                <button onClick={onClose}> <X/> </button>
            </header>
            <main className="flex flex-col items-center px-6 py-10 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-xl bg-black">
                    <span className="text-xl font-bold text-white">
                        LIFE STYLE
                    </span>
                </div>
                <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-500">
                    Welcome to Life Style — a place where people share,
                    discover and connect.
                </p>

                <Link to="/register">
                    <Button className="w-full sm:w-auto px-5 py-2 bg-transparent border border-blue-500 text-blue-500 hover:text-white underline hover:bg-blue-500">
                    Create Account
                    </Button>
                </Link>

                <Link to="/login">
                    <div>
                    
                    <Button variant="ghost"className="w-full sm:w-auto py-2 hover:bg-blue-100 hover:underline hover:text-blue-400 text-base text-gray-500">
                    Log in
                    </Button>
                    </div>
                </Link>
            </main>
            </div>
            
         </div>
    )
}