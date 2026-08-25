import { useAuthStore } from "@/stores/authStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function WelcomeCard() {
  const { accessToken } = useAuthStore();

  return (
    <div>
      {!accessToken && (
        <Card className="w-full mt-3 p-4  md:p-6 border md:border">
          <p className="text-base md:text-xl font-bold">
            Life Style Community is a community of 4,035,773 amazing developers
          </p>
          <p className="text-sm text-gray-600">
            We're a place where coders share, stay up-to-date and grow their careers.
          </p>
          <div className="mt-3">
          <Link to="/register">
            <Button className="w-full sm:w-auto px-5 py-2 bg-transparent border border-blue-500 text-blue-500 hover:text-white underline hover:bg-blue-500">
              Create Account
            </Button>
          </Link>
            
          </div>
          <Link to="/login">
            <div>
            
              <Button variant="ghost"className="w-full sm:w-auto py-2 hover:bg-blue-100 hover:underline hover:text-blue-400 text-base text-gray-500">
              Log in
            </Button>
            
            
          </div>
          </Link>
          
        </Card>
      )}
    </div>
  );
}

export default WelcomeCard;