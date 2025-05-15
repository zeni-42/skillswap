"use client"
import Image from "next/image"
import png3 from "@/assets/png3.png"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/navigation"

type formData = {
    fullName: string,
    email: string,
    password: string,
    cnfPassword?: string
}

export default function Signup(){
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<formData>()

    const handleAddData = async (data: formData) => {
        if (data?.fullName == '' || data?.email == '' || data?.password == '' || data?.cnfPassword == '') {
            toast.warning("All fields are required")
            return;
        }
        if (data.password != data.cnfPassword) {
            toast.error("Passwords are diffrent")
            return;
        } else {
            try {                
                delete data.cnfPassword
                const response = await axios.post('/api/auth/signup', {...data})
                if (response.status == 200) {
                    reset();
                    router.push('/auth/signin')
                }
            } catch (error: any) {
                const errorMsg = error.response?.data?.message;
                toast.error(errorMsg || "Error")
            }
        }
    }

    return (
        <>
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="w-1/3 h-screen flex justify-center items-center" >
                <Image src={png3} alt="png_2" width={1000} height={1000} className="size-auto" />
            </div>
            <div className="w-1/2 h-screen flex-col flex justify-center items-center">
                <form onSubmit={handleSubmit( handleAddData )} action="" className="w-2/3 h-2/3 flex justify-center items-center flex-col gap-7 px-10 pb-10 ">
                    <h1 className="text-black text-2xl font-medium " >Create your account</h1>
                    <input {...register("fullName")} type="text" placeholder="Name" className="text-lg w-full border border-zinc-400 h-12 text-zinc-600 rounded px-5"/>
                    <input {...register("email")} type="email" placeholder="Email" className="text-lg w-full border border-zinc-400 h-12 text-zinc-600 rounded px-5"/>
                    <input {...register("password")} type="password" placeholder="Password" className="text-lg w-full border border-zinc-400 h-12 text-zinc-600 rounded px-5"/>
                    <input {...register("cnfPassword")} type="password" placeholder="Confirm Password" className="text-lg w-full border border-zinc-400 h-12 text-zinc-600 rounded px-5"/>
                    <button className="bg-[#6a00ff] w-full h-12 rounded font-semibold text-lg " > Sign up </button>
                    <div className="text-zinc-400"> Have an account ? <Link href={"/auth/signin"} className="text-[#6a00ff] underline" >Sign in</Link>  </div>
                </form>
            </div>
        </div>
        </>
    )
}