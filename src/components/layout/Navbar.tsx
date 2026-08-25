import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {Link} from 'react-router-dom'
import MobileMenu from "./sidebar/MobileMenu";
import type { Category } from "@/types/Category";
import SearchPreview from "../search/SearchPreview";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar({ allCategories }: { allCategories: Category[] }) {
  const navigate = useNavigate()
  const { currentUser, accessToken,logout} = useAuthStore();
  const [search,setSearch] = useState("");
  const [showPreview,setShowPreview] = useState(false)
  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
}

  console.log("currentUser",currentUser),
  console.log("accessToken",accessToken)


  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <MobileMenu allCategories={allCategories} />
          <Link to={"/"}>
            <span className="font-bold text-sm whitespace-nowrap lg:text-xl">Life Style</span>
          </Link>
          
          <form className="relative hidden md:block w-64" onSubmit={handleSearchSubmit}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => {setSearch(e.target.value); setShowPreview(true)}}
              placeholder="Search posts..."
              className="pl-9 h-10 focus-visible:ring-blue-400 focus-visible:border-blue-400"
            />
          </form>
          {showPreview && search.trim() && (
            <SearchPreview onClose={() => {setShowPreview(false); setSearch("")}} search={search}/>
          )}
          {accessToken ? (<Link to="/create-post"><Button className="px-3 py-2 text-sm md:px-5 md:py-5 md:text-base bg-transparent border border-blue-500 text-blue-500 hover:text-white underline hover:bg-blue-500">Create Post</Button></Link>) : "" }
          
        </div>

        {currentUser ? (
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${currentUser.id}`}>
                <span className="lg:p-5 lg:hover:underline lg:hover:text-blue-500 text-xs lg:text-2xl">Hi, {currentUser.name}</span>
            </Link>
            
             <Button className={"hidden lg:block"} onClick={logout}>Logout</Button>
            
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <Button
              variant="ghost"
              className="py-5 hover:bg-blue-100 hover:underline hover:text-blue-400 text-lg text-gray-500 hidden lg:flex"
              
            >
              Log in
            </Button>

            </Link>
            
            <Link to="/register">
              <Button className="px-3 py-2 text-sm md:px-5 md:py-5 md:text-base bg-transparent border border-blue-500 text-blue-500 hover:text-white underline hover:bg-blue-500">
              Create Account
              </Button>
            </Link>
            
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;