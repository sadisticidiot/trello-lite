import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 }
  },
  exit: { 
    opacity: 0, 
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  }
}

const item = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
}

export default function Taskpad() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [type, setType] = useState({name: "", desc: ""})
  const isNew = id === "new"

  const types = [
    { name: "One-time", desc: "A time one quest that can be ticked off once finished." },
    { name: "Hourly", desc: "A quest that requires hourly attention." },
    { name: "Time specific", desc: "A quest that requires a specific date." },
    { name: "Daily", desc: "A daily quest that needs constant reminding." },
  ]

  return(
    <div className="flex flex-col gap-2 p-2">
      <header className="items-start flex">
        <button onClick={() => navigate(-1)}>
          <X />
        </button>
      </header>
      
      <div>
        {/* First dropdown */}
        <div className="flex flex-col gap-2">
          <span>Type</span>
          
          <div 
            className={clsx(
              "rounded-full p-2 h-10",
              type.name ? "bg-neutral-800" : "bg-neutral-900"
            )}
            onClick={() => setOpenDropdown(p => p === "type" ? null : "type")}
          >
            <span className={clsx(type.name ? "text-white" : "text-white/40")}>
              {type.name || "None"}
            </span>
          </div>

          <AnimatePresence>
            {openDropdown === "type" &&
              <motion.ul
                className="flex flex-col gap-2"
                initial="hidden" animate="visible" exit="exit"
                variants={container}
              >
                {types.map((t) => (
                  <motion.li
                    variants={item}
                    onClick={() => {setType(t); setOpenType(false)}}
                    key={t.name}
                    className="rounded-full p-2 bg-neutral-800"
                  >
                    <h2>{t.name}</h2>
                  </motion.li>
                ))}
              </motion.ul>
            }
          </AnimatePresence>
        </div>

        {/* Second dropdown */}
        <div className="flex flex-col gap-2">
          <span>Type</span>
          
          <div 
            className={clsx(
              "rounded-full p-2 h-10",
              type.name ? "bg-neutral-800" : "bg-neutral-900"
            )}
            onClick={() => setOpenDropdown(p => p === "type" ? null : "type")}
          >
            <span className={clsx(type.name ? "text-white" : "text-white/40")}>
              {type.name || "None"}
            </span>
          </div>

          <AnimatePresence>
            {openDropdown === "type" &&
              <motion.ul
                className="flex flex-col gap-2"
                initial="hidden" animate="visible" exit="exit"
                variants={container}
              >
                {types.map((t) => (
                  <motion.li
                    variants={item}
                    onClick={() => {setType(t); setOpenType(false)}}
                    key={t.name}
                    className="rounded-full p-2 bg-neutral-800"
                  >
                    <h2>{t.name}</h2>
                  </motion.li>
                ))}
              </motion.ul>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
