"use client"

import axios from "axios";
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateSkills() {
    const router = useRouter();
    const [skills, setSkills] = useState<any>([])

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/skills/get-skills`, {
                withCredentials: true
            })
            if (response.status == 200) {
                setSkills(response.data?.data)
            } else if (response.status == 401) {
                toast.warning("Unauthorized access")
                router.push('/auth/signin')
            } else {
                toast.error("Failed to get skills")
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        }
    }

    const updateUserSkills = async (skillId: string) => {
        try {
            const userId = localStorage.getItem("_id");
            const response = await axios.post('/api/user/update-skills', { skillId, userId })
            if (response.status == 200) {
                toast.info(response.data?.message)
            } else if (response.status == 401) {
                toast.warning("Unauthorized access")
                router.push('/auth/signin')
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        }
    }

    useEffect(() => {
        fetchSkills()
    }, [])

    return (
        <>
            <div className="w-full h-screen text-black ">
                <div className="w-full flex justify-between items-center px-40 py-10" >
                    <h1 className="text-2xl font-medium" >Please select your set of skills</h1>
                    <button onClick={() => router.push('/home')} className="flex justify-center items-center gap-2 cursor-pointer hover:bg-zinc-200 px-5 py-3 rounded"  > Skip for now <ArrowRight className="text-sm" /> </button>
                </div>
                <div>
                    <div className="w-full flex justify-center items-center " >
                        <input type="text" placeholder="e.g. Graphic Designer" className="rounded-l-lg border border-zinc-300 w-1/3 h-12 px-5 outline-none" />
                        <button className="bg-[#6a00ff] w-40 h-12 rounded-r-lg text-white font-medium text-lg" > Search </button>
                    </div>
                </div>
                <div className="w-full flex justify-center p-10">
                    <div className="w-1/2 max-h-[70vh] overflow-y-auto flex justify-center gap-4 flex-wrap">
                        {skills.length > 0 ? (
                        skills.map((item: any) => (
                            <button
                            key={item._id}
                            className={`min-w-[150px] px-5 py-3 border border-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 transition`}
                            onClick={() => updateUserSkills(item?._id)} >
                            <p className="text-center text-lg font-medium">{item.name}</p>
                            </button>
                        ))
                        ) : (
                        <p className="text-center text-zinc-500 w-full">No skills found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}