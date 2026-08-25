import { Card } from "@/components/ui/card";
import { useRecentPosts } from "@/hooks/usePosts";
import { Link } from "react-router-dom";
export default function RecentPost() {
  const { recentPost, loading, error } = useRecentPosts();

  return (
    <div className="mt-6">
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 px-4 pt-4">
             <span className="w-fit bg-yellow-300 px-2 py-1 rounded text-sm">
                New
            </span>
          <h3 className="text-lg font-bold text-gray-800">#discuss</h3>
          <p className="text-sm text-gray-500 mb-2">
            Discussion threads targeting the whole community!
          </p>
        </div>

        {loading && <p className="px-4 py-4 text-sm text-gray-400">Đang tải...</p>}
        {error && <p className="px-4 py-4 text-sm text-red-500">{error}</p>}

        {!loading &&
          recentPost.map((post) => (
            <Link to={`/posts/${post.id}`}>
               <div key={post.id} className="px-4 py-3 border-t">
              <h4 className="text-sm font-medium text-gray-700">{post.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{post._count.comments} comments</p>
            </div>
            </Link>
           
          ))}
      </Card>
    </div>
  );
}