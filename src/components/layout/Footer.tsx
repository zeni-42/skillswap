import { Facebook, Github, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer(){
    return (
        <>
        <div className="w-full h-[50vh] bg-[#0f0f0f] flex" >
            <div className="w-1/2 h-full flex justify-center items-start flex-col px-40 ">
                <h1 className="text-3xl font-semibold text-[#7b1dff] uppercase" >Skillswap</h1> 
                <h2>Learn smarter. Earn faster</h2>
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center items-center gap-10" >
                <div className="flex gap-10" >
                    <Link href={"#"} ><Facebook className="text-white" /> </Link>
                    <Link href={"#"} ><Twitter className="text-white" /> </Link>
                    <Link href={'https://github.com/zeni-42'} target="_blank" ><Github className="text-white" /> </Link>
                </div>
                <div className="bg-zinc-600 w-1/3 h-[0.5px]" />
                <a href="mailto:mailzeni42@gmail.com" className="flex cursor-pointer hover:underline" > mailzeni42@gmail.com </a>
            </div>
        </div>
        </>
    )
}