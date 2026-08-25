import {z} from "zod";

export const createPostFormSchema = z.object({
    title:z.string().min(1,"Yêu cầu nhập tiêu đề bài viết"),
    content:z.string().min(1,"Yêu cầu nhập nội dung bài viết"),
    categoryId:z.string().min(1,"Vui lòng chọn 1 danh mục"),
    coverImage:z.string().nullable().optional(),

})

export type PostFormValues = z.infer<typeof createPostFormSchema>