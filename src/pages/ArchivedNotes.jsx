import { useRef, useState } from "react"
import { useAuth } from "../AuthProvider"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react";

export default function ArchivedNotes() {
    const { posts } = useAuth()
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [pressingId, setPressingId] = useState(null)

    const timerRef = useRef(null)
    const longPressTriggered = useRef(false)

    const archivedNotes = posts.filter((p) => p.is_archived)

    const handlePointerDown = (id) => {
        longPressTriggered.current = false
        setPressingId(id)

        timerRef.current = setTimeout(() => {
            longPressTriggered.current = true
            setSelected((prev) => 
                prev.includes(id)
                    ? prev
                    : [...prev, id]
            )
        }, 600)
    }

    const handlePointerUp = () => {
        clearTimeout(timerRef.current)
        setPressingId(null)
    }

    const handlePointerLeave = () => {
        clearTimeout(timerRef.current)
        setPressingId(null)
    }

    const handleClick = (id) => {
        if (longPressTriggered.current) {
            longPressTriggered.current = false
            return
        }
        if (selected.length > 0) {
            setSelected((prev) =>
                prev.includes(id)
                    ? prev.filter((i) => i !== id)
                    : [...prev, id]    
            )
            return
        }

        navigate(`/app/notepad/${id}`)
    }

    return(
        <div className="relative">
            <AnimatePresence>
            {selected.length > 0 &&
                <motion.div 
                    key="selects"
                    className="fixed w-full left-0 z-50 gap-2 shadow-xl/20
                    top-0 bg-neutral-900 flex justify-center px-2"
                    initial={{ height: 0 }}
                    animate={{ height: 80 }}
                    exit={{ height: 0 }}
                >
                    <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected([])}
                    >
                        <X />
                    </motion.button>

                    <span className="flex-1 text-start flex items-center">{selected.length} items selected</span>
                </motion.div>
            }
            </AnimatePresence>

        <div className="columns-2">
            {archivedNotes.map((p) => {
                const pressing = pressingId === p.id
                const isSelected = selected.includes(p.id)
                return (
                <motion.div 
                    key={p.id} 
                    className="notes-base"
                    onPointerDown={() => handlePointerDown(p.id)}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerLeave}
                    onClick={() => handleClick(p.id)}
                    animate={{
                        scale:  isSelected ? 1.02 : pressing ? 0.96 : 1,
                        borderColor: isSelected ? "#fff" : "#ffffff71"
                    }}
                >
                    <h1 className="p-0 text-start text-[20px] pb-4 line-clamp-2">
                        {p.title || "Untitled"}
                    </h1>

                    <span className="text-neutral-200/95 line-clamp-4 text-ellipsis">
                        {p.post}
                    </span>

                    {selected.length > 0 &&
                        <div 
                            className="border-white/60 rounded-full absolute 
                            bottom-2 right-2 border-2 p-[7px]" 
                        />
                    }
                </motion.div>
                )}
            )}
        </div>
        </div>
    )
}