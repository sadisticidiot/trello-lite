import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { usePreviousPathname } from "../data/PrevRoute";
import { NotebookPen, User, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useState } from "react";

export default function FooterIncluded()  {
  const prevPath = usePreviousPathname()
  const location = useLocation()
  const navigate = useNavigate()
  const [isFooter, setIsFooter] = useState(true)

  const routes = [
    { name: "Notes", path: '/home', icon: NotebookPen },
    { name: "Profile", path: '/profile', icon: User },
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
  currentIndex < prevIndex ? -1 : 0

  const currentView =
  resolveRoute(location.pathname)?.name ?? "Home"

  const handleNav = (i) => {
    if (currentView !== i.name) {
        navigate(i.path)
    }
  }

    return(
        <div 
          className="flex relative w-dvw h-dvh select-none bg-white"
          onDoubleClick={() => setIsFooter(p => !p)}
        >
            <div className="size-full">
                <Outlet context={{ isFooter }}/>
            </div>

            {/* Footer */}
            {isFooter && 
              <motion.div 
                key="footer"
                initial={{ y: 40 }}
                animate={{ y: 0}}
                transition={{ duration: 0.2, ease: "easeInOut"}}
                className="bg-white w-full fixed z-80 
                grid grid-cols-2 gap-2 bottom-0 px-3"
              >
                {routes.map((i) => (
                  <div 
                    key={i.name}
                    className="flex flex-col items-center justify-center"
                  >
                    <button 
                      className="flex items-center justify-center"
                      onClick={() => handleNav(i)}
                    >
                      <i.icon 
                        className={clsx(
                          "size-5 mt-2",
                          currentView === i.name
                            ? "text-blue-700"
                            : "text-neutral-500"
                        )} 
                      />
                    </button>
              
                    <span
                      className={clsx(
                        "text-xs",
                          currentView === i.name
                            ? "text-blue-700"
                            : "text-neutral-500"
                      )}
                    >   
                      {i.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            }
        </div>
    )
}