"use client"
import axios from "axios";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page(){
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [image, setImage]= useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file)
    }

    const handleUploadData = async () => {
        if (!selectedFile) {
            toast.warning("File cannot be empty")
            return;
        }
        try {
            setIsLoading((prev) => !prev)
            const formData = new FormData();
            formData.append("image", selectedFile)
            formData.append("userId", userId)

            const response = await axios.post('/api/upload/profile', formData)
            if (response.status == 200) {
                toast.success(response.data?.message)
                const avatarUrl = response.data?.data?.avatar;
                localStorage.setItem("avatar", avatarUrl)
                setImage(avatarUrl)
                setSelectedFile(null)
            } else if (response.status == 401) {
                router.push('/auth/signin')
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        } finally {
            setIsLoading((prev) => !prev)
        }
    }


    useEffect(() => {
        const storedImage = localStorage.getItem("avatar")!
        const storedUserId = localStorage.getItem("_id")!
        setImage(storedImage)
        setUserId(storedUserId)
    },[handleUploadData])

    return(
        <>
        <div className="w-full h-screen text-black ">
            <div className="w-full flex justify-between items-center px-40 py-10" >
                <h1 className="text-2xl font-medium" >Please add your profile picture</h1>
                <button onClick={() => router.push('/home')} className="flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-200 px-5 py-3 rounded" > Skip for now <ArrowRight className="text-sm" /> </button>
            </div>
            <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-10" >
                {
                    image ? (<>
                        <Image src={image} alt="profile_png" width={1000} height={1000} className="size-60 rounded-full" />
                    </>) : (null)
                }
                <input className=" rounded-lg border p-3" type="file" placeholder="Edit" onChange={(e) => handleFileChange(e)} />
                <button className="w-40 py-3 bg-zinc-800 rounded-lg text-white" onClick={() => handleUploadData() } >
                    {
                        isLoading ? (<><span className="w-full h-full flex justify-center items-center" ><Loader2 className="animate-spin" /></span></>) : (<>Upload</>)
                    }
                </button>
                <Link href={'/update-banner'} className="w-40 py-3 flex justify-center items-center gap rounded-lg text-white bg-[#6a00ff]" >Continue <ChevronRight /></Link>
            </div>
        </div>
        </>
    )
}