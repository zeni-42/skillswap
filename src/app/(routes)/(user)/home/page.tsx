"use client"
import Navigation from "@/components/layout/Navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home(){
    const router = useRouter()
    const [users, setUsers] = useState([])
    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user/get-users')
            if (response.status == 200) {
                console.log(response.data?.data);
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
        fetchUser()
    },[])

    return(
        <>
        <Navigation />
        <div className="pt-20 w-full h-screen text-black px-96 " >
            <section>
                <h1 className="text-2xl font-semibold">Find you first mentor at Skillswap </h1>
                <div>
                    
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