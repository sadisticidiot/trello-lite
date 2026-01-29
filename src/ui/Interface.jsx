import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Interface({ children, closable = false }) {
    const location = useLocation()
    const loc = location.pathname
    const [displayLoc, setDisplayLoc] = useState(loc)

    return(
        <div className="fixed inset-0 p-2 flex flex-col justify-center items-center bg-neutral-900">
            <header className="relative flex w-full items-center justify-center">
                {closable && <Link to='/' className="absolute left-3">
                    <XMarkIcon className="size-[15px]"/>
                </Link>}

                <AnimatePresence mode="wait">
                    <motion.h1
                        key={displayLoc}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                        {displayLoc === "/signup" ? "Create your account" 
                            : displayLoc === "/finish-setup" ? "Setup your password" 
                            : displayLoc === "/create-account" ? "Finishing touches"
                            : "Sign in"
                        }
                    </motion.h1>
                </AnimatePresence>
            </header>

            {children}

            <footer className="flex items-end justify-center py-1">
                <span className="text-white/30 text-sm text-center flex justify-center items-center gap-1">
                    This is a prototype created by Fizz 
                    <FaceSmileIcon className="size-[15px]"/>
                </span>
            </footer>
        </div>
    )
}