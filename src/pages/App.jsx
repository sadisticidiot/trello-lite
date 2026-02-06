import clsx from "clsx";
import { 
    HomeIcon, Menu as MenuIcon, 
    User 
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { 
    Outlet, useLocation, 
    useNavigate 
} from "react-router-dom";
import { usePreviousPathname } from "../data/PrevRoute";
import { useEffect } from "react";

export default function App() {
    const prevPath = usePreviousPathname()
    const location = useLocation()
    const navigate = useNavigate()
    const loc = location.pathname

    const routes = [
        { name: "Home", path: '/app', icon: HomeIcon },
        { name: "Profile", path: '/app/profile', icon: User },
        { name: "Menu", path: '/app/menu', icon: MenuIcon },
    ]

    const resolveRoute = (pathname) => routes
        .slice()
        .sort((a, b) => b.path.length - a.path.length)
        .find(r => pathname.startsWith(r.path))
    
    const getIndex = (pathname) => {
        const route = resolveRoute(pathname)
        return route ? routes.findIndex(r => r.path === route.path) : 0
    }
    
    const currentIndex = getIndex(location.pathname)
    const prevIndex = prevPath ? getIndex(prevPath) : currentIndex

    const direction = 
        currentIndex > prevIndex ? 1 :
        currentIndex < prevIndex ? -1 :
        0

    const currentView =
        resolveRoute(location.pathname)?.name ?? "Home"

    const handleNav = (i) => {
        if (currentView !== i.name) {
            navigate(i.path)
        }
    }

    return(
        <div 
            className="relative h-screen overflow-y-auto
            flex flex-col no-scrollbar overscroll-contain"
        >
            <motion.div 
                key={location.pathname}
                className="flex-1 h-full"
                initial={{ x : direction * 250 }}
                animate={{ x: 0 }}
                exit={{ x: direction * -250 }}
                transition={{ duration: 0.2, ease: "easeInOut"}}
            >
                <Outlet />
            </motion.div>

            {loc !== '/app/new-post' && <div 
                className="bg-neutral-900 w-full fixed 
                grid grid-cols-3 gap-2 bottom-0"
            >
                <AnimatePresence mode="wait">
                    {routes.map((i) => (
                        <div 
                            key={i.name}
                            className="flex flex-col items-center 
                            justify-center"
                        >
                            <button 
                                className="border-0 flex
                                items-center justify-center p-0"
                                onClick={() => handleNav(i)}
                            >
                                <i.icon 
                                    className={clsx(
                                        "size-6 mt-3",
                                        currentView === i.name
                                        ? "text-blue-500"
                                        : "text-neutral-200/30"
                                    )} 
                                />
                            </button>

                            <span
                             className={clsx(
                                currentView === i.name
                                ? "text-blue-500 text-[14px]"
                                : "text-neutral-200/30 text-[12px]"
                             )}
                            >   
                                {i.name}
                            </span>
                        </div>
                    ))}
                </AnimatePresence>
            </div>}
        </div>
    )
} 