import { useState } from "react"
import { useAuth } from "../AuthProvider"
import { Pen } from "lucide-react"
import clsx from "clsx"
import { motion, AnimatePresence } from "motion/react"

export default function Posts() {
    const { posts } = useAuth()
    const [open, setOpen] = useState(false)

    console.log(posts)

    return(
        <div className="relative size-full flex items-center justify-center">
            {posts.length === 0 
                ? (
                    <span className="text-white/40">
                        No posts yet. Create your first one now!
                    </span>
                ) : (
                    <span>
                        {posts}
                    </span>
                )
            }

            <AnimatePresence mode="wait">
                <motion.div 
                    initial={{ height: open ? 150 : 48 }}
                    animate={{ height: open ? 150 : 48 }}
                    exit={{ height: open ? 150 : 48 }}
                    className="absolute bottom-4 right-4 flex flex-col border-1 border-blue-900 w-12 rounded-full overflow-hidden"
                >
                    <button 
                        className={clsx(
                            "size-full bg-neutral-200 border-black/30 p-0 text-black",
                        )}
                        onClick={() => setOpen(p => !p)}
                    >
                        +
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}