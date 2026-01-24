import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Interface() {
    const location = useLocation()
    const loc = location.pathname
    const [displayLoc, setDisplayLoc] = useState(loc)

    return(
        <div className="fixed inset-0 p-2 flex flex-col justify-center items-center bg-neutral-900">
            <header className="relative flex w-full items-center justify-center">
                <Link to='/' className="absolute left-3">
                    <XMarkIcon className="size-[15px]"/>
                </Link>

                <AnimatePresence mode="wait">
                    <motion.h1
                        key={displayLoc}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
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

            <div className="size-full p-3 border-1 border-white/12 rounded bg-neutral-950">
                <AnimatePresence mode="wait" onExitComplete={() => setDisplayLoc(loc)}>
                    <motion.div 
                        key={loc}
                        className="size-full"
                        initial={{
                            x: loc === "/signin" ? -200 
                            : 200,
                            opacity: 0,
                            scale: 0.98
                        }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{
                            x: loc === "/signin" ? -200 
                            : 200,
                            opacity: 0,
                            scale: 0.95
                        }}
                        transition={{ duration: 0.2, ease: "easeIn"}}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </div>

            <footer className="flex items-end justify-center py-1">
                <span className="text-white/30 text-sm text-center flex justify-center items-center gap-1">
                    This is a prototype created by Fizz 
                    <FaceSmileIcon className="size-[15px]"/>
                </span>
            </footer>
        </div>
    )
}