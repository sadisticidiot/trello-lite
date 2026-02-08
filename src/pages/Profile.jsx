import { useAuth } from "../AuthProvider"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { usePreviousPathname } from "../data/PrevRoute"
import { motion, AnimatePresence } from "motion/react"
import { Search } from "lucide-react"

export default function Profile() {
    const prevPath = usePreviousPathname()
    const { posts, profile, name, profileLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const loc = location.pathname

    const [searchInput, setSearchInput] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const pages = [
        { name: "Notes", path: '/app/profile'},
        { name: "Pinned", path: '/app/profile/pinned-notes'},
        { name: "Archived", path: '/app/profile/archived-notes'},
    ]

    const resolveRoute = (pathname) => pages
        .slice()
        .sort((a, b) => b.path.length - a.path.length)
        .find(p => pathname.startsWith(p.path))
    
    const getIndex = (pathname) => {
        const route = resolveRoute(pathname)
        return route ? pages.findIndex(p => p.path === route.path) : 0
    }
    
    const currentIndex = getIndex(location.pathname)
    const prevIndex = prevPath ? getIndex(prevPath) : currentIndex

    const currentView =
        resolveRoute(location.pathname)?.name ?? "Notes"

    const handleNav = (i) => {
        if (currentView !== i.name) {
            navigate(i.path)
        }
    }

    return(
        <div className="h-full flex flex-col no-scrollbar
        pb-30 justify-center p-2 overflow-y-auto">
            {isOpen ? (
                <div className="bg-neutral-900 p-2 flex justify-end">
                    <button onClick={() => setIsOpen(false)}
                    className="rounded-0 w-auto">
                        ESC
                    </button>
                </div>
            ) : (
                <header className="flex justify-between 
                relative p-2 px-20 items-end gap-5">
                    <div className="absolute left-2 top-1">
                        <img src={profile} className="rounded-full
                        size-12 border-2 border-white/20" />

                    </div>
                    {pages.map((p) => (
                        <div key={p.name} className="relative flex flex-col">
                            <button onClick={() => handleNav(p)}
                            className={clsx(
                            "w-auto border-0 p-0",   
                            currentView === p.name
                            ? "text-[14px] text-white"
                            : "text-[13px] text-white/40"
                            )}>
                                {p.name}
                            </button>

                            <AnimatePresence>
                                {currentView === p.name && (
                                <motion.div
                                    className="absolute top-6 w-full h-0.5 bg-neutral-100"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    exit={{ scaleX: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                />
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <button className="absolute right-2 top-1
                    w-auto border-0 p-0" onClick={() => setIsOpen(true)}>
                        <Search />
                    </button>
                </header>
            )}

            <div className="flex-1 h-full p-5">
                <Outlet />
            </div>
        </div>
    )
}