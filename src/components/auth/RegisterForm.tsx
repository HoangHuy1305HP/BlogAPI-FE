import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormValues } from "@/schemas/authSchema";
import useRegister from "@/hooks/useRegister";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema)
    });

    const { registerUser, loading, error } = useRegister();
    const navigate = useNavigate();

    async function onSubmit(data: RegisterFormValues) {
        const success = await registerUser(data);

        if (success) {
            navigate("/login");
        }
    }

    return (
        <div className="w-full flex justify-center px-4 py-10 lg:py-16">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md lg:max-w-xl rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-lg">

                <div className="mb-8 text-center">
                    <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                        Life Style
                    </span>
                    <p className="mt-3 text-sm lg:text-base text-gray-500">
                        Đăng ký tài khoản của bạn
                    </p>
                </div>

                <div className="mb-6 w-full">
                    <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">
                        Email
                    </label>
                    <Input {...register("email")} placeholder="yourmail@gmail.com" className="h-12 lg:h-14 text-base lg:text-lg px-4" />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="mb-6 w-full">
                    <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">
                        Your Account Name
                    </label>
                    <Input {...register("name")} placeholder="User Name" className="h-12 lg:h-14 text-base lg:text-lg px-4" />
                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mb-8 w-full">
                    <label className="mb-2 block text-sm lg:text-base font-medium text-gray-700">
                        Password
                    </label>
                    <Input {...register("pass")} placeholder="••••••••" type="password" className="h-12 lg:h-14 text-base lg:text-lg px-4" />
                    {errors.pass && <p className="mt-2 text-sm text-red-500">{errors.pass.message}</p>}
                </div>

                {error && <p className="mb-5 text-sm text-red-500 text-center">{error}</p>}

                <Button type="submit" disabled={loading} className="w-full h-12 lg:h-14 text-base lg:text-lg font-medium">
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
            </form>
        </div>
    );
}