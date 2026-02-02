import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import { useAuth } from "../AuthProvider"
import { BookmarkIcon, HomeIcon, Menu, Minus, User } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { motion, AnimatePresence } from "motion/react"

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
            <div className="block md:hidden fixed inset-0">
                <div className="size-full relative">
                    <div className="size-full">
                        <Outlet />
                    </div>

                    {sheet === "new-post"
                        ? (
                            <div className="size-full">
                                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/60" />
                            <div className="bg-neutral-900 w-full h-125 absolute bottom-0 rounded-t-[25px] flex flex-col items-center justify-center">
                                <Minus className="size-10 scale-x-300 text-white/70" />
                                <div className="flex-1" />
                            </div>
                            </div>
                        ) : (
                        <div className="absolute bottom-0 w-full bg-neutral-900 shadow-lg flex items-center justify-between px-3 gap-2">
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
                        )
                    }
                </div>
            </div>
        </>
    )
}