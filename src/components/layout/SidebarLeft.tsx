import type { Category } from "@/types/Category";
import WelcomeCard from "./sidebar/WelcomeCard";
import CategoryList from "./sidebar/CategoryCard";
import OtherCard from "./sidebar/OtherCard";
import SocialLinks from "./sidebar/SocialLinks";
import SponsorBanner from "./sidebar/SponsorBanner";
function SidebarLeft({allCategories}:{allCategories:Category[]}) {
    

    return <div>
        <WelcomeCard></WelcomeCard>
        <CategoryList allCategories={allCategories}></CategoryList>
        <OtherCard></OtherCard>
        <SocialLinks></SocialLinks>
        
        <SponsorBanner></SponsorBanner>
    </div>
}

export default SidebarLeft