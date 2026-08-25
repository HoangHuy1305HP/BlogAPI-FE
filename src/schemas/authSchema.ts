import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    pass:z.string().min(6,"Mật khẩu tối thiểu 6 ký tự"),
})
export type LoginFormValues = z.infer<typeof loginSchema>; // Tạo 1 TS tên như kia dựa trực tiếp trên loginSchema (có trường email và password)

export const registerSchema = z.object({
    email:z.string().email("Email không hợp lệ"),
    name:z.string().min(3,"Tên người dùng không được để trống"),
    pass:z.string().min(6,"Mật khẩu tối thiểu 6 ký tự")
})

export type RegisterFormValues = z.infer<typeof registerSchema>;