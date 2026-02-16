import { useRef, useState } from "react"
import { useAuth } from "../AuthProvider"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { X, ArchiveRestore, Trash2, Check } from "lucide-react";
import { supabase } from "../data/supabase-client";

export default function ArchivedNotes() {
    const { posts, setPosts } = useAuth()
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

    const handleSelectAll = () => {
        if (selected.length === archivedNotes.length) {
            setSelected([])
        } else {
            setSelected(archivedNotes.map((p) => p.id))
        }
    }

    const handleUnarchive = async () => {
        const { error } = await supabase
            .from("posts")
            .update({ is_archived: false })
            .in("id", selected)

        if(error) {
            console.error(error)
        } 
        setSelected([])
    }

    const handleDel = async () => {
        const { error } = await supabase
            .from("posts")
            .delete()
            .in("id", selected)

        if (error) {
            console.error(error)
        }

        setSelected([])
    }


    return(
        <div className="flex flex-col gap-4">
            {selected.length > 0 &&
                <button 
                    className="flex justify-end"
                    onClick={handleSelectAll}
                >
                    <motion.div 
                        className="border-white/60 rounded-full 
                        border-2 size-5 flex items-center justify-center"
                        animate={{
                            backgroundColor: selected.length === archivedNotes.length ? "#66666680" : "#ffffff00"
                        }} 
                    >
                        {selected.length === archivedNotes.length &&<Check className="size-2"/>}
                    </motion.div>
                </button>
            }
        <div className="columns-2 relative pb-5">
            {/* Header and Footer */}
            <AnimatePresence>
            {selected.length > 0 &&
            <>
                <motion.div 
                    key="header"
                    className="fixed w-full left-0 z-50 gap-2
                    top-0 bg-neutral-900 flex justify-center px-2"
                    initial={{ height: 0 }}
                    animate={{ height: 60 }}
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

                <motion.div 
                    key="footer"
                    className="fixed w-full left-0 z-90 shadow-xl/20 items-center
                    bottom-0 bg-neutral-900 grid grid-cols-2"
                    initial={{ height: 0 }}
                    animate={{ height: 60 }}
                    exit={{ height: 0 }}
                >
                    <div className="flex flex-col items-center">
                    <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleUnarchive}
                    >
                        <ArchiveRestore className="size-5"/>
                    </motion.button>
                    <span className="text-sm font-light">Restore all</span>
                    </div>

                    <div className="flex flex-col items-center">
                    <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDel}
                    >
                        <Trash2 className="size-5"/>
                    </motion.button>
                    <span className="text-sm font-light">Delete all</span>
                    </div>

                </motion.div>
            </>
            }
            </AnimatePresence>

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
                        <motion.div 
                            className="border-white/60 rounded-full absolute 
                            bottom-2 right-2 border-2 size-5 flex items-center justify-center"
                            animate={{
                                backgroundColor: isSelected ? "#66666680" : "#ffffff00"
                            }} 
                        >
                            {isSelected &&<Check className="size-2"/>}
                        </motion.div>
                    }
                </motion.div>
                )}
            )}
        </div>
        </div>
    )
}