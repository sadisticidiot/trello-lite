import { AnimatePresence, motion, useMotionValue } from "motion/react"
import { Plus } from "lucide-react"
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useRef, useState } from "react"
import clsx from "clsx"
import NoteEditor from "../logic/NoteEditor"

const RESTING_Y = 80

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const addNote = searchParams.get("add_note")

  const y = useMotionValue(RESTING_Y)

  const pages = [
    { name: "Notes", path: "/home" },
    { name: "Tasks", path: "/home/tasks" },
    { name: "Archived", path: "/home/archived-notes" },
  ]

  const resolveRoute = (pathname) => pages
  .slice()
  .sort((a, b) => b.path.length - a.path.length)
  .find(r => pathname.startsWith(r.path))
    
  const handleNav = (i) => {
    if (currentView !== i.name) {
        navigate(i.path)
    }
  }

  const currentView = resolveRoute(location.pathname)?.name ?? "Notes"

  return (
    <div className="flex flex-col h-dvh">
      <div className="flex flex-col pl-1 p-2">
        {/* Add button and bottom sheet */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => navigate(`${location.pathname}?add_note=new`)}
          >
            <Plus className="text-blue-700" />
          </button>
        </div>

        <AnimatePresence>
        {addNote &&
          <NoteEditor />
        }
        </AnimatePresence>

        {/* Search bar */}
        <div className="rounded-full flex bg-neutral-400/50 p-1 px-2 items-center mx-1">
          <input 
            placeholder="Search" 
            className="placeholder:text-neutral-400 text-black w-full input-base" />
        </div>

        <h1 className="font-bold text-black p-2 pb-1 text-[2rem]">missnakita</h1>

        {/* Nav */}
        <div className="grid grid-flow-col">
          {pages.map((p) => (
            <div className="relative flex flex-col items-center">
              <button
                key={p.name}
                onClick={() => handleNav(p)}s
                className={clsx(
                  "pb-1 transition-colors duration-200 text-sm",
                  currentView === p.name ? "text-black" : "text-neutral-500"
                )}
              >
                {p.name}
              </button>
              
              <AnimatePresence>
              {currentView === p.name &&
                <motion.div 
                  key="underline"
                  className="bg-blue-700 h-0.5 w-5/10 absolute bottom-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                />
              }
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Children */}
      <div className="flex-1 pb-12 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}