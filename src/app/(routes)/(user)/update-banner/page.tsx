"use client"

import axios from "axios"
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Page() {
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [banner, setBanner] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/api/user/get-users?userId=${userId}`)
            if (response.status == 401) {
                router.push('/auth/signin')
            } else if (response.status == 200) {
                setBanner(response.data?.data[0].banner)
            }
        } catch (error:any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        }
    }

    const handleUploadData = async () => {
        if (!selectedFile) {
            toast.warning("File cannot be empty")
            return
        }
        try {
            const formaData = new FormData()
            formaData.append("file", selectedFile)
            formaData.append("userId", userId)

            const response = await axios.post('/api/upload/banner', formaData)
            if (response.status == 401) {
                router.push('/auth/signin')
            } else if (response.status == 200) {
                toast.success(response.data?.message)
                const bannerUrl = response.data?.data?.avatar;
                localStorage.setItem("avatar", bannerUrl)
                setBanner(bannerUrl)
                setSelectedFile(null)
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        } finally {
            setIsLoading((e) => !e)
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLFormElement>) =>  {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file)
    }


    useEffect(() => {
        getUserDetails()
    }, [])

    useEffect(() => {
        const storedUserId = localStorage.getItem("_id")!
        setUserId(storedUserId)
        const storedBanner = localStorage.getItem("banner")!
        setBanner(storedBanner)
    },[])

    return (
        <>
        <div className="w-full h-screen text-black ">
            <div className="w-full flex justify-between items-center px-40 py-10" >
                <h1 className="text-2xl font-medium" >Please add your banner</h1>
                <button onClick={() => router.push('/home')} className="flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-200 px-5 py-3 rounded" > Skip for now <ArrowRight className="text-sm" /> </button>
            </div>
            <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-10 px-96" >
                {
                    banner ? (<>
                        <Image src={banner} alt="banner_image" width={1000} height={1000} className="w-full h-[30vh] object-cover rounded-lg"/>
                    </>)  : (null)
                }
                <input className=" rounded-lg border p-3" type="file" placeholder="Edit" onChange={(e) => handleFileChange(e as any)} />
                <button className="w-40 py-3 bg-zinc-800 rounded-lg text-white" onClick={() => handleUploadData() } >
                    {
                        isLoading ? (<><span className="w-full h-full flex justify-center items-center" ><Loader2 className="animate-spin" /></span></>) : (<>Upload</>)
                    }
                </button>
                <Link href={'/home'} className="w-40 py-3 flex justify-center items-center gap rounded-lg text-white bg-[#6a00ff]" >Continue <ChevronRight /></Link>
            </div>
        </div>
        </>
    )
}