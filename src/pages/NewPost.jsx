import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeft, Ellipsis, Globe, UserIcon, UserLock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react"

export default function NewPost() {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(null)
    const [charName, setCharName] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    return(
        <motion.div 
            className="w-screen h-screen overflow-y-auto 
            overscroll-contain no-scroll p-4"
        >
            <div className="size-full relative flex flex-col">
                <header className="fixed top-4 left-6 w-9/10 flex 
                items-center gap-5">
                    <div className="flex-1">
                        <button className="p-0 border-0 w-auto" onClick={() => navigate(-1)}>
                            <ChevronLeft />
                        </button>
                    </div>

                    <div className="relative h-8"> 
                        <motion.div
                            initial={{ y: 2, height: 32 }}
                            animate={{ y: isOpen ? 1 : 2, height: isOpen ? 75 : 32 }}
                            exit={{ y: 2, height: 32 }} 
                            onClick={() => setIsOpen(p => !p)}
                            className="flex flex-col py-1 px-2 rounded
                            bg-neutral-700/60 gap-4 max-h-300
                            overflow-hidden absolute right-0 top-0"
                        >
                            <div className="flex gap-2  
                                justify-center"
                            >
                                <span>Public</span>
                                <Globe />
                            </div>

                            {isOpen && <div className="flex gap-2 absolute top-12 justify-center">
                                <span>Private</span>    
                                <UserLock />
                            </div>}
                        </motion.div>
                    </div>

                    <div className="flex justify-end">
                    <Ellipsis />
                    </div>
                </header>
            </div>
        </motion.div>
    )
}