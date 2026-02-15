import { useAuth } from "../AuthProvider"
import { 
    Outlet, useLocation, 
    useNavigate, useSearchParams 
} from "react-router-dom"
import clsx from "clsx"
import { useState } from "react"
import { usePreviousPathname } from "../data/PrevRoute"
import { motion, AnimatePresence } from "motion/react"
import { 
    ChevronRight, ClipboardCheck, 
    LayoutList, Pen, Plus, Search, 
    X 
} from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  },
  exit: { 
    opacity: 0, 
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, x: 150 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 150 }
}

export default function Profile() {
    const prevPath = usePreviousPathname()
    const { posts, profile, name, profileLoading } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    const view = searchParams.get("view-profile")
    const [searchInput, setSearchInput] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isSearch, setIsSearch] = useState(false)

    const pages = [
        { name: "Notes", path: '/app/profile'},
        { name: "Tasks", path: '/app/profile/tasks'},
        { name: "Archived", path: '/app/profile/archived-notes'},
    ]

    const actions = [
        { name: "Add Note", icon: Pen, path: '/app/notepad/new' },
        { name: "Quest", icon: ClipboardCheck, path: '/app/taskpad/new' },
        { name: "To-do", icon: LayoutList },
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

    const searchedTitles = searchInput ? posts.filter(p => 
        p.title?.toLowerCase().includes(searchInput.toLowerCase())
    ) : []

    return(
        <div 
            className="h-full flex flex-col bg-neutral-900 p-2 relative overflow-y-auto">
            {isSearch ? (
                <div className="relative flex">
                    <div className="fixed inset-0 backdrop-blur-sm
                    bg-black/70 z-90" onClick={() => setIsSearch(false)}/>

                    <div className="absolute top-1 bg-neutral-900 
                    flex flex-col w-full rounded z-100">
                        <div className="flex items-center justify-between
                        border-b-1 border-white/30 px-4 p-2">
                            <Search className="size-4"/>

                            <input placeholder="Search for a specific note..."
                            className="inset-shadow-none w-auto flex-1 py-1
                            focus:ring-0" value={searchInput} 
                            onChange={(e) => setSearchInput(e.target.value)}/>

                            <button onClick={() => setIsSearch(false)}
                            className="rounded-0 w-auto py-1 text-sm">
                                close
                            </button>
                        </div>

                        <div className=" py-2 px-4 flex flex-col gap-4">
                            {searchedTitles.map((p) => (
                                <div key={p.id} className="bg-neutral-800 
                                rounded p-2 cursor-pointer"
                                onClick={() => navigate(`/app/notepad/${p.id}`)}>
                                    <h1>{p.title}</h1>
                                </div>
                            ))}

                            {searchedTitles.length === 0 && 
                                <div className="h-40 flex items-center justify-center">
                                    <span className="text-white/40">No results</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <header className="flex justify-between
                relative gap-8 items-center">
                    {/* Profile */}
                    <button
                        onClick={() => navigate(`${location.pathname}?view-profile=true`)}
                    >
                        <img 
                            src={profile} 
                            className="rounded-full size-12 border-2 border-white/20"
                        />
                    </button>

                    <div className="flex justify-between px-2 flex-1 items-end">
                    {pages.map((p) => (
                        <div key={p.name} className="relative flex flex-col">
                            <button onClick={() => handleNav(p)}
                            className={clsx(
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
                    </div>

                    <button onClick={() => setIsSearch(true)}>
                        <Search className="size-6"/>
                    </button>
                </header>
            )}

            <div className="flex-1 p-2 pt-4 pb-12">
                <Outlet />
            </div>

            {view && <div className="fixed inset-0 flex items-center justify-center">
                <div className="overlay" onClick={() => navigate(location.pathname)}/>
                <div className="rounded items-center z-20
                p-2 bg-neutral-900 shadow-xl/30 flex flex-col gap-2">
                    <img src={profile} className="size-25 rounded-full" />
                    <span>{name}</span>
                    <button className="py-1 rounded-full text-[14px] 
                    flex items-center">
                        View full profile <ChevronRight className="size-4"/>
                    </button>
                </div>
            </div>}
                  
            <div className="flex flex-col fixed bottom-13 right-4
            gap-2 items-end shadow-xl/30 z-90">
                <AnimatePresence>
                {isOpen && <motion.ul className="flex-1 flex flex-col gap-2
                w-full items-end" exit="exit"
                variants={container} initial="hidden" animate="visible">
                    {actions.map((m) => (
                        <motion.li key={m.name} variants={item}
                        onClick={() => navigate(m.path)}
                        className="rounded-full p-2 px-3 border-1 gap-1
                        border-white/40 flex bg-neutral-900/80
                         cursor-pointer backdrop-blur-[1px] w-max">
                            <m.icon />
                            <span>{m.name}</span>
                        </motion.li>
                    ))}
                </motion.ul>}
                </AnimatePresence>
                <button className="border-0 p-3 rounded-[12px]
                bottom-15 shadow-xl/30 w-auto bg-pink-700"
                onClick={() => setIsOpen(p => !p)}>
                    {isOpen ? (
                        <motion.div key="close"
                        initial={{ rotate: -90, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0.9 }}
                        >
                            <X className="text-black" />
                        </motion.div>
                    ) : (
                        <motion.div key="add"
                        initial={{ rotate: 90 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: 90 }}
                    >
                        <Plus className="text-black"/>
                    </motion.div>
                    )}
                </button>
            </div>
        </div>
    )
}