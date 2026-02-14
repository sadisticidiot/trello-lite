import { Link, useSearchParams } from "react-router-dom"
import logo from "/ewan.jfif"
import { X } from "lucide-react"
import { motion } from "motion/react"
import { supabase } from "../data/supabase-client"
import { useState } from "react"

export default function DesktopAuth({ children }) {
    const [searchParams] = useSearchParams()
    const auth = searchParams.get("auth")
    const [loading, setLoading] = useState(false)
    

    const handleGoogle = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `$window.location.origin`
            }
        })

        if (error) {
        console.error(error.message)
        setGoogleLoad(false)
        }
    }

    return(
        <motion.div 
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="bg-neutral-900 flex fixed z-100 w-120
            items-center justify-center p-4 h-screen shadow-xl/30"
        >
                <div className="relative flex flex-col justify-between size-full gap-4">
                    <Link to="/">
                        <X className="absolute top-3 right-3"/>
                    </Link>
                    <h1>{auth === "signup" ? "Create your account" : "Welcome back!"}</h1>
                    <div className="flex items-center justify-center">
                        <img src={logo} className="rounded-full size-20" />
                    </div>

                    <div className="flex-1">
                        {children}
                        <div className="flex w-full items-center gap-2 my-2">
                            <hr className="border-t border-white/20 flex-1" />
                            <p className="text-white/20">OR</p>
                            <hr className="border-t border-white/20 flex-1" />
                        </div>
                        <button 
                            className="secondary-button flex"
                            onClick={handleGoogle}
                        >
                            {loading ? <span className="spinner"/> : "Continue with Google" }
                        </button>
                    </div>

                    <footer className="flex justify-center">
                        <span className="text-sm text-white/40">basta gawa ko to</span>
                    </footer>
                </div>
        </motion.div>
    )
}