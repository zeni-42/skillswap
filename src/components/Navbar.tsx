"use client"
import Image from "next/image";
import svg from "@/assets/image.svg"
import Link from "next/link";
import { easeInOut, easeOut, motion } from "motion/react";

export default function Navbar() {
    return (
        <>
        <motion.div initial={{ y: "-100%" }} animate={{ y: "0%" }} transition={{ ease: easeOut, delay: 0.15, duration: 0.85 }}
            className="z-10 w-full h-20 fixed top-3 flex justify-center items-center ">
            <div className="w-3/5 h-10/12 bg-white/50 rounded-full border backdrop-blur-2xl flex justify-between items-center pl-10 pr-3" >
                <div className="flex justify-center items-center gap-3" >
                    <Image src={svg} alt="logo_svg" width={5000} height={5000} className="size-7 rounded" />
                    <h1 className="text-zinc-800 font-medium" > Skillswap </h1>
                </div>
                <div className="flex w-1/2 justify-end items-center gap-5" >
                    <Link href={"#"} className="font-medium animate " > Plans & Pricing </Link>
                    <Link href={"#"} className="font-medium animate " > Explore </Link>
                    <button className="bg-[#6a00ff] px-7 py-3 rounded-full cursor-pointer" >
                        <h1 className="font-semibold" >Start now</h1>
                    </button>
                </div>
            </div>
        </motion.div>
        </>
    )
}