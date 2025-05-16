"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UpdateSkills() {
    const [fullName, setFullName] = useState('fullName')
    const router = useRouter();
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
            </div>
        </>
    )
}