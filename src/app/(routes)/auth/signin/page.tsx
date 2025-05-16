"use client"
import Image from "next/image"
import png2 from "@/assets/png2.png"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

type formData = {
    email: string,
    password: string
}

export default function Signup(){
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<formData>()
    const [skills, setSkills] = useState<Array<string>>([])

    const handleAddData = async (data: formData) => {
        if (data?.email == "" || data?.password == "") {
            toast.warning('All fields are required')
            return;
        }
        try {
            const response = await axios.post('/api/auth/signin', {...data})
            if (response.status == 200) {
                setSkills(response.data?.data?.skills)
                if (skills.length <= 0) {
                    router.push('/update-skills')
                    return;
                }
                router.push('/home')
                reset()
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        }
    }

    return (
        <>
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="w-1/3 h-screen flex justify-center items-center" >
                <Image src={png2} alt="png_2" width={1000} height={1000} className="size-auto" />
            </div>
            <div className="w-1/2 h-screen flex-col flex justify-center items-center">
                <form onSubmit={handleSubmit( handleAddData )} action="" className="w-2/3 h-2/3 flex justify-center items-center flex-col gap-7 px-10 pb-10 ">
                    <h1 className="text-black text-2xl font-medium " >Sign in to your account</h1>
                    <input {...register("email")} type="email" placeholder="Email" className="text-lg w-full border border-zinc-400 h-12 text-zinc-600 rounded px-5"/>
                    <input {...register("password")} type="password" placeholder="Password" className="text-lg w-full border border-zinc-400 h-12 text-zinc-600 rounded px-5"/>
                    <button className="bg-[#6a00ff] w-full h-12 rounded font-semibold text-lg " > Sign up </button>
                    <div className="text-zinc-400"> Don't have an account ? <Link href={"/auth/signup"} className="text-[#6a00ff] underline" >Sign up</Link>  </div>
                </form>
            </div>
        </div>
        </>
    )
}