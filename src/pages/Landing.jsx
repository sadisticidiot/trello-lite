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
            className="flex flex-col items-center justify-center fixed inset-0 bg-[url(/landing-bg.png)] bg-cover bg-cover p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}    
        >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/60 from-20% via-black/90 via-50% to-black to-90%" />
            <div className="flex gap-6 justify-between items-center fixed top-4 bg-neutral-950 p-4 px-6 w-9/10 rounded-full shadow-xl/30">
                <img src={logo} className="size-10 rounded-full border-2 border-r-0 border-white/70" />

                <button className="w-35 bg-pink-600 font-bold text-[13px] rounded-full">Sign In</button>
            </div>


          <div className="flex justify-center items-center z-3">
            <h1 className="text-[30px]">Talaan</h1>
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