import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useEffect } from "react";
import { motion } from "motion/react";
import logo from "/ewan.jfif"
import { Menu } from "lucide-react"

export default function Landing() {
    const { session } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (session) {
            navigate("/app", { replace: true })
        }
    }, [session])

function DesktopDisplay() {
    return(
        <div>Hi</div>
    )
}

function MobileDisplay() {
    return(
        <motion.div 
            className="flex flex-col items-center justify-center fixed inset-0 bg-neutral-950 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}    
        >
            <div className="flex gap-6 justify-between items-center fixed top-0 bg-pink-500 p-2 px-4 w-full z-10">
                <img src={logo} className="size-10 rounded-full border-2 border-r-0 border-white/70" />

                <button className="bg-teal-300 w-35 ring-1 ring-white text-black font-bold text-[13px]">Sign In</button>
            </div>


          <div className="flex justify-center items-center z-3">
            <h1 className="text-[30px]">ewan ko na lang talaga</h1>
          </div>

            <div className="flex w-full justify-center items-center gap-2 z-3">
                <Link to='/signin' className="link-base">Sign in</Link>
                <Link to ='/signup' className="link-base">Sign up</Link>
            </div>
        </motion.div>
    )
}
    return(
        <>
            <div className="block md:hidden w-full">
                <MobileDisplay />
            </div>

            <div className="hidden md:block w-full">
                <DesktopDisplay />
            </div>
        </>
    )
}