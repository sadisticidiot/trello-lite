import { useState } from "react"
import { useParams } from "react-router-dom"
import clsx from "clsx"
import { motion } from "motion/react"

export default function Taskpad() {
    const { id } = useParams()
    const [openType, setOpenType] = useState(false)
    const [type, setType] = useState({name: "", desc: ""})
    const isNew = id === "new"

    const types = [
        { name: "One-time", desc: "A time one quest that can be ticked off once finished." },
        { name: "Hourly", desc: "A quest that requires hourly attention." },
        { name: "Time specific", desc: "A quest that requires a specific date." },
        { name: "Daily", desc: "A daily quest that needs constant reminding." },
    ]

    return(
        <div className="grid grid-rows-2 h-full p-4 pb-15 gap-2">
            <div className="flex flex-col gap-2 relative">
                <div className="flex gap-2 items-center">
                    <span>Type of quest:</span>
                    <div 
                        onClick={() => setOpenType(p => !p)}
                        className="border-neutral-600 bg-neutral-900
                        relative p-2 rounded border-2 flex-1"
                    >
                        {openType && 
                            <div 
                                className="absolute bg-neutral-800/70 
                                w-full top-11 left-0"
                            >
                                {types.map((t) => (
                                    <motion.div 
                                        key={t.name} 
                                        onClick={() => setType(t)}
                                        className="p-2" 
                                        whileTap={{ 
                                            backgroundColor: "#404040"
                                        }}
                                    >
                                        <span>{t.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        }

                        {type.name || "None"}
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <span>{type.desc}</span>
                </div>

                <button className={clsx(
                    "absolute bottom-0 right-0",
                   type.name ? "text-white underline"
                   : "text-white/40" 
                )}>
                    Next
                </button>
            </div>

            <div className="bg-neutral-900 border-2 
            border-neutral-400/40">
            </div>
        </div>
    )
}
