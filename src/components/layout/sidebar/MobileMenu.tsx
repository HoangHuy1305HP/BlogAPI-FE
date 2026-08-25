import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import CategoryList from "./CategoryCard";
import SearchPreview from "@/components/search/SearchPreview";
import type { Category } from "@/types/Category";
import SocialLinks from "./SocialLinks";
import WelcomeCard from "./WelcomeCard";
import  { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
export default function MobileMenu({allCategories}: {allCategories:Category[]} ) {
    const navigate = useNavigate()
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const { accessToken,logout} = useAuthStore();
    const [search,setSearch] = useState("");
    const [showPreview,setShowPreview] = useState(false)
    function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;
    setShowPreview(false);

    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
}

    return <div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger render={<Button className={`lg:hidden `} variant="ghost" size="icon"/>}>
                <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className={`overflow-y-auto`}>
            <div className="relative w-full p-2 m-2">
                
                <form onSubmit={handleSearchSubmit} className="w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input value={search} onChange={(e) => {setSearch(e.target.value); setShowPreview(true)}} placeholder="Search posts..." className="pl-9 h-10 focus-visible:ring-blue-400 focus-visible:border-blue-400"
                    />
                </form>
                {showPreview && search.trim() && (
                            <SearchPreview onClose={() => setShowPreview(false)} search={search}/>
                )}
                
          </div>
                <WelcomeCard></WelcomeCard>
                <CategoryList allCategories={allCategories}></CategoryList>
                <SocialLinks></SocialLinks>
                {accessToken && <div className="flex gap-2 items-center m-2">
            
            
                    <Button onClick={logout}>Logout</Button>
          </div> }
            </SheetContent>
        </Sheet>
    </div>
}