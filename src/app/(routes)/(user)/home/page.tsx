"use client"
import Navigation from "@/components/layout/Navigation";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home(){
    const router = useRouter()
    const [userId, setUserId] = useState('')
    const [users, setUsers] = useState([])
    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user/get-users')
            if (response.status == 200) {
                setUsers(response.data?.data)
            } else if (response.status == 401) {
                router.push('/auth/signin')
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg || "Error")
        }
    }

    useEffect(() => {
        fetchUser();
        const storedId = localStorage.getItem("_id")
        setUserId(storedId!)
    },[])

    return(
        <>
        <Navigation />
        <div className="pt-20 w-full h-screen text-black px-96 " >
            <section>
                <div className="flex justify-between items-center" >
                    <h1 className="text-2xl font-semibold">Find you mentor at Skillswap </h1>
                    <button className="text-sm text-zinc-500 hover:underline cursor-pointer" >View all</button>
                </div>
                <div className="w-full h-[25vh] flex justify-start items-start gap-5 py-5 flex-wrap overflow-y-auto" >
                    {
                        users.length > 0 ? (
                            users.filter((item: any) => item._id !== userId).slice(0,6).map((item:any) => 
                                <button key={item?._id} className="hover:shadow-sm w-full sm:w-[48%] md:w-[32%] h-20 px-5 border border-zinc-300 hover:border-[#6a00ff] rounded-lg flex justify-between items-center cursor-pointer gap-5"
                                    onClick={() => router.push(`/profile/${item?._id}`)}
                                >
                                    <div className="flex justify-center items-center gap-5" >
                                        <Image src={item?.avatar!} alt="user_pfp" width={600} height={600} className="rounded-full size-12" />
                                        <div className="flex justify-start items-start flex-col" >
                                            <h1 className="text-lg" >{item?.fullName}</h1>
                                            <p className="text-xs text-zinc-500 " >{item?.skillInfo[0]}</p>
                                        </div>
                                    </div>
                                    <span><ChevronRight /></span>
                                </button>
                            )
                        ) : (<> <p>User not found</p> </>)
                    }
                </div>
            </section>
            <section>
                <h1 className="text-2xl font-semibold">Learn whats trending in around you </h1>
                {/* Availavale skill will be here */}
            </section>
        </div>
        </>
    )
}