import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import { useAuth } from "../AuthProvider"
import { HomeIcon, Menu, Minus, User } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { motion, AnimatePresence } from "motion/react"
import { Overlay } from "../ui/Overlay"

export default function App(){
    const { loading } = useAuth()  
    const navigate = useNavigate()
    const location = useLocation()

    if (loading) {
        return(
            <div className="fixed inset-0 flex items-center justify-center"><span className="spinner size-8" /></div>
        )
    }

    const params = new URLSearchParams(location.search)
    const sheet = params.get("sheet")

    const closeSheet = () => {
        params.delete("sheet")
        navigate(`?${params.toString()}`)
    }


    const navItems = [
        { name: "home", path: '/app', icon: HomeIcon, label: "Home" },
        { name: "profile", path: '/app/profile', icon: User, label: "Profile" },
        { name: "menu", path: '/app/menu', icon: Menu, label: "Menu" },
    ]

    const currentView = navItems
        .slice()
        .sort((a ,b) => b.path.length - a.path.length)
        .find((item) => location.pathname.startsWith(item.path))
        ?.name ?? "home"

    const handleNav = (item) => {
        if (currentView !== item.name) {
            navigate(item.path)
        }
    }

    return(
        <>
            <div className="block md:hidden fixed inset-0 flex flex-col justify-center items-center">
                <div className="flex-1 w-full">
                    <Outlet />
                </div>

                <Overlay>
                    <AnimatePresence mode="wait">
                        {sheet === "new-post" &&
                            <div className="flex items-end fixed inset-0">
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={closeSheet} 
                                    className="backdrop-blur-[2px] bg-black/60 absolute inset-0 z-10" 
                                />

                                <motion.div 
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ duration: 0.2, ease: "easeInOut"}}
                                    className="fixed bg-neutral-900 w-full min-h-115 rounded-t-[25px] flex flex-col items-center justify-center z-50"
                                >
                                    <Minus className="scale-x-220"/>
                                    <div className="flex-1" />
                                </motion.div>
                            </div>
                        }
                    </AnimatePresence>
                </Overlay>

                {sheet !== "new-post" && 
                    <div className="fixed bottom-0 w-full bg-neutral-900 shadow-lg flex items-center justify-between px-3 gap-2">
                        {navItems.map((item) => (
                            <div key={item.name} className="size-full flex flex-col items-stretch">
                                <button
                                    onClick={() => handleNav(item)}
                                    aria-label={item.label}
                                    className={clsx(
                                        "relative flex-1 flex justify-center items-center border-0 rounded-[0] transition-colors",
                                        currentView === item.name
                                        ? "text-neutral-100"
                                        : "text-neutral-400"
                                    )}
                                >
                                    <item.icon className="w-6 h-10" />
                                </button>

                                {currentView === item.name && 
                                    <AnimatePresence>
                                        {currentView === item.name && (
                                            <motion.div
                                                className="w-full h-1 bg-neutral-100"
                                                initial={{ scaleX: 0, opacity: 0 }}
                                                animate={{ scaleX: 1, opacity: 1 }}
                                                exit={{ scaleX: 0, opacity: 0 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                            />
                                        )}
                                    </AnimatePresence>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}