import {useForm} from "react-hook-form";
import { updateProfile } from "@/services/userService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
type EditProfileForm = {
    name: string;
    bio: string;
};

export default function EditProfilePage() {
    const {register,handleSubmit,formState:{errors}} = useForm<EditProfileForm>();
    const {currentUser} = useAuthStore()
    const navigate = useNavigate()
    const onSubmit = async (data:EditProfileForm) => {
        try {
            await updateProfile(data)

            navigate(`/profile/${currentUser?.id}`);
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <main className="min-h-[calc(100vh-64px)] bg-gray-50 flex justify-center px-4 py-10">
            <div className="w-full max-w-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa hồ sơ của bạn</h1>
                    <p className="mt-1 text-sm text-gray-500">Cập nhật thông tin cá nhân</p>
                </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                     <label htmlFor="name" className="text-sm font-medium text-gray-700"> Tên</label>
                     <input {...register("name")} placeholder="Tên" className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-none transition
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"></input>
                </div>

                <div className="flex flex-col gap-2">
                     <label htmlFor="name" className="text-sm font-medium text-gray-700">Tiểu sử</label>
                     <textarea {...register("bio")} className="w-full px-3 py-2 rounded-lg border border-gray-300 outline-none resize-none transition
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"></textarea>
                </div>
                
                
                
                    <button type="submit" className="px-5 py-2 w-50 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Lưu thay đổi</button>
                
                
            </form>

        </div>
        </main>
        
    )
}