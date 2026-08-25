import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostFormSchema } from "@/schemas/postSchema";
import type { PostFormValues } from "@/schemas/postSchema";
import type { Post } from "@/types/Post";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useCategories } from "@/hooks/useCategories";
import { useTags } from "@/hooks/useTags";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useUpdatePost from "@/hooks/useUpdatePost";

export default function PostForm({initialData}: {initialData?:Post | null}) {
  const { register, handleSubmit,reset, control, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(createPostFormSchema),
  });
  

  const { allCategories } = useCategories();
  const { tags } = useTags();
  const { createPostAction, loading, error } = useCreatePost();
  
  const navigate = useNavigate();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  useEffect(() => {
    if(initialData) {
       reset({
      title:initialData?.title,
      content:initialData?.content,
      categoryId: initialData?.categoryId as string,
      coverImage:initialData?.coverImage as string
    });
    
    const tagsId = initialData.tags.map(t => t.id);
    setSelectedTagIds(tagsId)
  }
    },[initialData]
   )
   const postId = initialData?.id as string
   const {updatePostAction} = useUpdatePost({postId})

  async function onSubmit(data1: PostFormValues, published: boolean) {
    if(!initialData) {
        const fullData = {  ...data1, coverImage:data1.coverImage ?? undefined, tagIds: selectedTagIds };
      const result = await createPostAction(fullData, published);
        if (result) {
          
        navigate("/");
      }
      return 
    } 
      const updatedData = {...data1, coverImage: data1.coverImage ?? undefined,tagIds:selectedTagIds};
      const result = await updatePostAction(updatedData,published);
      if(result) {
        navigate("/")
      }
      return
  }
//   console.log("Lỗi hiện tại:", errors);
  return (
    <form className="max-w-2xl lg:max-w-4xl mx-auto p-4 lg:p-8 flex flex-col gap-4 lg:g-6">
      <div>
        <Input {...register("title")} placeholder="New Post Title" className="text-2xl lg:text-4xl font-bold border-none focus-visible:ring-0 " />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
        </div>
        <div>
        <Input {...register("coverImage")} defaultValue="" placeholder="Dán ảnh URL cover (không bắt buộc) " className="h-10 lg:h-12"/>
        {errors.coverImage && (
        <p className="text-sm text-red-500 mt-1">{errors.coverImage.message}</p>
        )}
      </div>
      <div>
        <Controller name="categoryId" control={control} render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={"lg:h-12"}>
                <SelectValue placeholder="Chọn danh mục">
                  {allCategories.find((c) => c.id === field.value)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && <p className="text-sm text-red-500 mt-1">{errors.categoryId.message}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTagIds.includes(tag.id);
          return (
            <Button key={tag.id} type="button" variant={isSelected ? "default" : "outline"} size="sm" onClick={() => {
                if (isSelected) {
                  setSelectedTagIds(selectedTagIds.filter((id) => tag.id !== id));
                } else {
                  setSelectedTagIds([...selectedTagIds, tag.id]);
                }
              }}
              className="rounded-full"
            >
              #{tag.name}
            </Button>
          );
        })}
      </div>

      <div>
        <Textarea {...register("content")} placeholder="Write your content here..." className="min-h-75 lg:min-h-125 resize-none" />
        {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <div className="flex gap-2 lg:gap-3 justify-end">
        <Button type="button" variant="outline" onClick={handleSubmit((data) => onSubmit(data, false))} disabled={loading} className={"lg:h-11"}>
          Save Draft
        </Button>
        <Button type="button" onClick={handleSubmit((data) => onSubmit(data, true))} disabled={loading} className={"lg:h-11"}>
          {loading ? "Đang đăng..." : "Publish"}
        </Button>
      </div>
    </form>
  );
}