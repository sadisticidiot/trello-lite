import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { NotebookPen, Plus, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { useState } from "react";
import NoteEditor from "../logic/NoteEditor";

export default function Footer()  {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const addNote = searchParams.get("add_note")

  const [isFooter, setIsFooter] = useState(true)

  const routes = [
    { name: "Notes", path: '/', icon: NotebookPen },
    { name: "Settings", sheet: "new", icon: Plus },
    { name: "Add Note", path: '/settings', icon: Settings },
  ]

  const resolveRoute = (pathname) => routes
  .filter(r => r.path)
  .slice()
  .sort((a, b) => b.path.length - a.path.length)
  .find(r => pathname.startsWith(r.path))
    
  const currentView =
  resolveRoute(location.pathname)?.name ?? "Home"

  const handleNav = (i) => {
    if (i.sheet) {
      setSearchParams({ add_note: "new" })
      return
    }

    if (currentView !== i.name) {
        navigate(i.path)
    }
  }
  
  return(
    <div className="flex relative h-dvh select-none bg-white">
      <div 
        className="size-full"
        onDoubleClick={() => setIsFooter(p => !p)}
      >
        <AnimatePresence>
        {addNote && <NoteEditor />}
        </AnimatePresence>
        <Outlet context={{ isFooter }}/>
      </div>
      
      {/* Footer */}
      <AnimatePresence>
        {isFooter && 
        <motion.div 
          key="footer"
          initial={{ y: 100 }}
          animate={{ y: 0}}
          exit={{ y: 100 }}
          transition={{ duration: 0.2, ease: "easeInOut"}}
          className="bg-white w-full fixed z-30 border-neutral-400
          grid grid-flow-col gap-2 bottom-0 px-3 border-t-1"
        >
          {routes.map((i) => (
            <div 
              key={i.name}
              className="flex items-center justify-center p-1"
            >
              <button 
                onClick={() => handleNav(i)}
              >
                <i.icon 
                  className={clsx(
                    "size-6 mt-2",
                    currentView === i.name
                      ? "text-blue-700"
                      : "text-neutral-500"
                  )} 
                />
              </button>
            </div>
          ))}
        </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}