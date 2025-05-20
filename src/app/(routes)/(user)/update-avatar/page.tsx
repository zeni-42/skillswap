"use client"
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(){
    const router = useRouter()
    const [image, setImage]= useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        const storedImage = localStorage.getItem("avatar")!
        setImage(storedImage)
    },[])

    return(
        <>
        <div className="w-full h-screen text-black ">
            <div className="w-full flex justify-between items-center px-40 py-10" >
                <h1 className="text-2xl font-medium" >Please add your profile picture</h1>
                <button onClick={() => router.push('/home')} className="flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-200 px-5 py-3 rounded"  > Skip for now <ArrowRight className="text-sm" /> </button>
            </div>
            <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-10" >
                {
                    image ? (<>
                    <Image src={image} alt="profile_png" width={1000} height={1000} className="size-60 rounded-full" />
                    </>) : (null)
                }
                <input className=" rounded-lg border p-3" type="file" placeholder="Edit" />
                <button className="w-40 py-3 bg-[#6a00ff] rounded-lg text-white" >Upload</button>
            </div>
        </div>
        </>
    )
}