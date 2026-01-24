import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useEffect } from "react";
import { motion } from "motion/react";

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
            className="flex flex-col items-center justify-center fixed inset-0 bg-[url('/maka.webp')] bg-cover bg-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}    
        >
          <div className="absolute inset-0 bg-linear-to-b from-neutral-900/95 to-black/95" />

          <div className="flex-1 flex justify-center items-center z-3">
            <h1 className="text-[30px]">ewan ko na lang talaga</h1>
          </div>

            <div className="flex flex-col w-full justify-center items-center gap-2 z-3">
                <Link to='/signin' className="link-base bg-white border-1 md:border-2 text-black">Sign in</Link>
                <Link to ='/signup' className="link-base bg-black border-1 md:border-2">Sign up</Link>
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