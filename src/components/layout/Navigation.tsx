"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import svg from "@/assets/image.svg"
import Link from "next/link"

export default function Navigation(){
    const [fullName, setFullName] = useState('')

    useEffect(() => {
        const storedName = localStorage.getItem("name")
        setFullName(storedName!)
    }, [])
    return (
        <>
        <div className="w-full h-16 bg-white/50 fixed top-0 px-40 flex justify-between items-center text-black backdrop-blur-[800px] border-b-[1px] border-b-zinc-200/50 ">
            <div className="w-1/3 flex justify-start items-center gap-3" >
                <Image src={svg} alt="logo_svg" width={5000} height={5000} className="size-7 rounded" />
                <h1 className="text-zinc-800 font-medium" > Skillswap </h1>
            </div>
            <div className="w-1/3 flex justify-end items-center gap-10">
                <Link href={'#'} className="text-zinc-500 hover:underline" >Explore</Link>
                <Link href={'#'} className="text-zinc-500 hover:underline" >Upgrade</Link>
                <Link href={'#'} className="text-zinc-500 hover:underline" >{fullName}</Link>
            </div>
        </div>
        </>
    )
}