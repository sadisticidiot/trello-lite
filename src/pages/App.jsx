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
import Home from "./Home.jsx"
import Profile from "./Profile.jsx"
import Menu from "./Menu.jsx"

export default function App() {
    const location = useLocation()
    const navigate = useNavigate()
    const pageWidth = window.innerWidth

    const navItems = [
        { name: "Home", path: '/app', icon: HomeIcon },
        { name: "Profile", path: '/app/profile', icon: User },
        { name: "Menu", path: '/app/menu', icon: MenuIcon },
    ]

    const pages = [
        { name: "Home", path: '/app', element: <Home /> },
        { name: "Profile", path: '/app/profile', element: <Profile /> },
        { name: "Menu", path: '/app/menu', element: <Menu /> },
    ]

    const activeIndex = pages.findIndex(p => 
        location.pathname.startsWith(p.path)
    )

    const safeIndex = activeIndex === -1 ? 0 : activeIndex


    const currentView = navItems
        .slice()
        .sort((a, b) => b.path.length - a.path.length)
        .find((i) => location.pathname.startsWith(i.path))
        ?.name ?? "home"

    const handleNav = (i) => {
        if (currentView !== i.name) {
            navigate(i.path)
        }
    }

    return(
        <div 
            className="relative h-screen overflow-x-auto
            flex flex-col no-scrollbar overscroll-contain"
        >
            <motion.div 
                className="flex border-2 border-green-500 
                h-screen w-[300vw] overflow-y-auto no-scrollbar
                "
                drag="x"
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={{ left: -pageWidth * (pages.length -1), right: 0 }}
                animate={{ x: -safeIndex * pageWidth }}
                onDragEnd={(e, info) => {
                    const threshold = pageWidth
                }}
            >
                {pages.map((p) => (
                    <div
                        key={p.name}
                        className="w-screen h-full flex-none"
                    >
                        {p.element}
                    </div>
                ))}
            </motion.div>

            {/*<div 
                className="bg-neutral-900 w-full sticky bottom-0
                grid grid-cols-3 gap-2"
            >
                <AnimatePresence mode="wait">
                    {navItems.map((i) => (
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
            </div>*/}
        </div>
    )
} 