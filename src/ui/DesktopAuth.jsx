import { Link, useSearchParams } from "react-router-dom"
import logo from "/ewan.jfif"
import { X } from "lucide-react"
import { motion } from "motion/react"

export default function DesktopAuth({ children }) {
    const [searchParams] = useSearchParams()
    const auth = searchParams.get("auth")

    return(
        <motion.div 
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="bg-pink-800 flex fixed z-100 w-120
            items-center justify-center p-4 h-screen"
        >
                <div className="relative flex flex-col justify-between size-full gap-4">
                    <Link to="/">
                        <X className="absolute top-3 right-3"/>
                    </Link>
                    <h1>{auth === "signup" ? "Create your account" : "Welcome Back"}</h1>
                    <div className="flex items-center justify-center">
                        <img src={logo} className="rounded-full size-20" />
                    </div>

                    <div className="flex-1">
                        {children}
                    </div>

                    <footer className="flex justify-center">
                        <span className="text-sm text-white/40">basta gawa ko to</span>
                    </footer>
                </div>
        </motion.div>
    )
}