import { AnimatePresence, motion, useMotionValue } from "motion/react"
import { Search, Plus } from "lucide-react"
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import BottomSheet from "../ui/BottomSheet"

const RESTING_Y = 80

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const newNote = searchParams.get("add_note") === "new"

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
    <div className="flex flex-col size-full overflow-hidden">
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
        {newNote &&
            <BottomSheet>
              <div className="rounded-full bg-neutral-400 h-1 w-10 mb-4" />
              <input placeholder="Title" className="text-neutral-700 w-full input-base text-xl"/>
            </BottomSheet>
        }
        </AnimatePresence>

        <div className="rounded-full gap-2 flex bg-neutral-400/50 p-1 px-2 items-center mx-1">
          <Search className="size-5 text-neutral-400" />
          <input placeholder="Search" className="text-neutral-400 flex-1 input-base" />
        </div>

        <h1 className="font-bold text-black pb-0 p-1 text-[2rem]">missnakita</h1>

        {/* NAV */}
        <div className="grid grid-flow-col">
          {pages.map((p) => (
            <button
              key={p.name}
              onClick={() => handleNav(p)}
              className={`pb-1 transition-colors duration-200 ${
                currentView === p.name ? "text-black" : "text-neutral-500"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}