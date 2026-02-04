import { useEffect, useRef, useState } from "react"
import { supabase } from "../data/supabase-client"
import { useAuth } from "../AuthProvider"
import { HomeIcon, Menu, Minus, User } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from "motion/react"
import { Overlay } from "../ui/Overlay"

export default function App(){
    const { loading } = useAuth()  
    const navigate = useNavigate()
    const location = useLocation()

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const bgColor = useTransform(y, [0, 300], [
        "rgba(0,0,0,0.6)",
        "rgba(0,0,0,0)"
    ])
    const divOpacity = useTransform(y, [0, 300], [1, 0])

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
                <motion.div 
                    dragMomentum={false}
                    className="flex-1 w-full"
                >
                    <Outlet />
                </motion.div>

                <Overlay>
                    <AnimatePresence mode="wait">
                        {sheet === "new-post" &&
                            <div className="fixed inset-0 border-2 border-green-500">
                                    <div className="relative h-screen w-full border-2 border-blue-700 flex flex-col items-center justify-end">
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ backgroundColor: bgColor }}
                                            onClick={closeSheet} 
                                            className="absolute inset-0 
                                            backdrop-blur-[1px]" 
                                        />

                                        <motion.div
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            exit={{ y: "100%" }}
                                            drag="y"
                                            style={{ y }}
                                            dragConstraints={{ top: -180, bottom: 300 }}
                                            dragMomentum={false}
                                            dragElastic={0}
                                            onDragEnd={(e, info) => {
                                                const currentY = y.get()
                                                if (currentY > 150) {
                                                    closeSheet()
                                                } else if (currentY < -100) {
                                                    animate(y, -150)
                                                } else {
                                                    animate(y, 0)
                                                }
                                            }}
                                            className="flex flex-col items-center justify-center 
                                            absolute -bottom-50 size-full bg-neutral-900
                                            rounded-[20px]" 
                                        >
                                            <Minus className="size-8 scale-x-[2]"/>


                                            <div className="flex-1 w-full p-4">
                                                <textarea placeholder="What's on your mind?" className="p-2 size-full resize-none rounded text-start bg-neutral-950"/>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div style={{ opacity: divOpacity }}  className="bg-neutral-700 w-94/100 py-4 z-50" />
                                    </div> 
                            </div>
                        }
                    </AnimatePresence>
                </Overlay>

                {sheet !== "new-post" && 
                    <div className="w-full bg-neutral-900 shadow-lg flex items-center justify-between px-3 gap-2">
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