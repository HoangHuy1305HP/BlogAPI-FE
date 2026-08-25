import type { Category } from "@/types/Category";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoryList({ allCategories }: { allCategories: Category[] }) {
  const navigate = useNavigate()
  return (
    <ul className="flex flex-col gap-1">
      {allCategories.map((c) => (
        <li key={c.id}>
          <Button variant="ghost" onClick={() => navigate(`/posts?categoryId=${c.id}`)} className="w-full justify-start gap-2 px-2 py-6 mt-2 text-gray-600 hover:bg-blue-100 hover:text-blue-500"
          >
            <Tag className="size-4" />
            <span>{c.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;