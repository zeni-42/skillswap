'use client'
import Navigation from "@/components/layout/Navigation"
import axios from "axios"
import { Calendar, LocateIcon, MapPin } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Page({ params }:any ){
    const router = useRouter()
    const {userId}:any = React.use(params)
    const [user, setUser] = useState<any>({})
    const [userSkills, setUserSkills] = useState([])
    
    const getUserData = async () => {
        try {
            const response = await axios.get(`/api/user/get-users?userId=${userId}`)
            if (response.status == 200) {
                console.log(response.data?.data[0]);
                setUser(response.data?.data[0])
                setUserSkills(response.data?.data[0].skillInfo)
            } else if (response.status == 401) {
                router.push('/auth/signin')
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        }
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <>
        <Navigation/>
        <div className="w-full h-screen pt-20 text-black">
            <section className="px-96">
                <div className="w-full h-[30vh] flex justify-start items-center px-10 ">
                    <div>
                        {
                            !user.avatar ? (null) : (<><Image src={user.avatar!} alt="profile picture" width={600} height={600} className="rounded-full size-40" /></>)
                        }
                    </div>
                    <div className="w-2/3 h-full px-10 flex justify-center items-start flex-col" >
                        <h1 className="text-2xl font-semibold" >{user.fullName}</h1>
                        <p className="text-lg font-medium text-zinc-600" >{user.bio}</p>
                        <p className="pt-5 font-medium text-xl" >Skills</p>
                        <div className="py-2 w-full h-auto flex justify-start items-center gap-1.5 flex-wrap overflow-y-auto">
                        {
                            userSkills.length > 0 ? (
                            userSkills.slice(0, 5).map((item) => (
                                <button key={item} id={item} className="h-10 px-2 rounded shadow-sm cursor-pointer hover:bg-gray-200 bg-gray-300 text-zinc-800">
                                <p className="text-sm" >{item}</p>
                                </button>
                            ))
                            ) : (
                            <p className="text-sm text-zinc-400" >No skill found for the user</p>
                            )
                        }
                        </div>
                    </div>
                    <div>
                        <button className="text-white bg-[#6a00ff] text-lg w-40 py-2 rounded font-medium cursor-pointer">Message</button>
                    </div>
                </div>
            </section>
            <section className="px-96" >
                <div className="w-full h-auto p-10 " >
                    <h1 className="text-2xl font-medium" >Ratings & reviews</h1>
                    <div>
                    {
                        user.rating == 0 ? (<>
                            <h1 className="text-sm text-zinc-400" >No ratings available</h1>
                        </>) : (<>
                            <h1 className="text-sm text-zinc-400" >Ratings loaded just need to implement</h1>
                        </>)
                    }
                    </div>
                </div>
            </section>
            <section className="px-96" >
                <div className="w-full h-[20vh] rounded-lg bg-zinc-100 p-10 flex justify-center items-start gap-5 flex-col ">
                    <h1 className="text-2xl font-medium" >About this account</h1>
                    <p className="flex gap-3  " ><MapPin /> based in India</p>
                    <p className="flex gap-3  " ><Calendar /> joined in {new Date(user.createdAt).getFullYear()}</p>
                </div>
            </section>
        </div>
        </>
    )
}