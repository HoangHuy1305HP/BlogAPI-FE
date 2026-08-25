import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/authSchema";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const {register,handleSubmit, formState: {errors}} = useForm<LoginFormValues>({
        resolver:zodResolver(loginSchema),
    })
    /* 
     - register: đăng ký các giá trị vào các ô input (ở đây là các trường của LoginFormValues)
     - handleSubmit: hàm xử lý việc submit form (của useForm)
     - errors: chứa các lỗi và thông báo lỗi của từng field (ở đây là 2 field email và password)
     - resolver:zodResolver(loginSchema) đơn giản bảo React Hook Form sử dụng loginSchema của Zod để kiểm tra dữ liệu của Form
    */
     const {loginUser,loading,error} = useLogin();
     const navigate = useNavigate()

     async function onSubmit(data:LoginFormValues) {
        const succss = await loginUser(data);
        if(succss) {
            navigate("/")
        }
       
     }

     return (
        <div className="bg-gray-100 flex flex-col justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md lg:max-w-lg  rounded-2xl bg-white p-8 shadow-lg">

                     
                    <div className="mb-6 text-center">
                    <span className="text-2xl font-bold">
                        Life Style
                    </span>

                    <p className="mt-2 text-sm text-gray-500">
                        Đăng nhập vào tài khoản của bạn
                    </p>
                    </div>

                    
                    <div className="mb-4 w-full">
                         <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <Input
                            {...register("email")}
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="mt-2 mb-2 text-sm text-red-500">{errors.email?.message}</p>
                        )}
                    </div>
                    
                    <div className="mb-4 w-full">
                        <label className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <Input {...register("pass")} placeholder="••••••••" type="password"></Input>
                        {errors.pass && (
                            <p className="mt-2 mb-2 text-sm text-red-500">{errors.pass.message}</p>
                        )}
                    </div>

                    <Button type="submit">{loading ? "Đang đăng nhập" : " Đăng nhập "}</Button>
                    {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
                        
            </form>
        </div>
        
     )
     

}


