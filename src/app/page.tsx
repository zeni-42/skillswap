"use client"
import Navbar from "@/components/Navbar";
import Image from "next/image";
import png1 from "@/assets/png1.png"
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    return(
        <>
        <Navbar />
        <div className="-z-10 blux" />
        <section className="z-10 backdrop-blur-[800px] ">
            <div className="w-full h-screen flex justify-center items-center flex-col gap-10">
                <h1 className="text-zinc-800 text-4xl font-semibold flex gap-2 " >Discover the <p className="text-[#6a00ff] uppercase font-semibold "> skill </p> that turns effort into <p className="text-[#6a00ff] uppercase font-semibold ">income</p></h1>
                <h2 className="text-zinc-700" >Learn smarter. Earn faster</h2>
                <div className="w-full flex justify-center items-center gap-10" >
                    <button onClick={() => router.push('/auth/signup')} className="cursor-pointer w-40 bg-[#6a00ff] px-7 py-3 rounded-full" >
                        <h1 className="font-semibold" >Get Started</h1>
                    </button>
                    <button className="cursor-pointer w-40 h-12 border border-zinc-400 rounded-full text-zinc-600">Try demo</button>
                </div>
            </div>
            <div className="w-full h-screen flex justify-center items-center text-zinc-800 gap-20 px-40 ">
                <Image src={png1} alt="png_1" width={1000} height={1000} className="w-2/3 h-auto" />
                <div className="w-1/2 flex gap-10 flex-col" >
                    <h1 className="text-2xl font-medium text-black flex justify-center items-center gap-1" > What is <p className="text-[#6a00ff] uppercase" >skillswap</p>? </h1>
                    <p className="text-lg font-normal">Skill Swap is a collaborative learning platform where users teach and learn from one another. By sharing your expertise, you earn learning time that can be used to gain new skills from others in the community. This peer-to-peer approach creates a continuous cycle of growth, making learning more engaging, accessible, and rewarding. Skill Swap transforms how people connect, share knowledge, and invest in each other’s growth.</p>
                </div>
            </div>
        </section>
        <Footer />
        </>
    )
}
