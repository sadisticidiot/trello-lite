import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeft, Ellipsis, Globe, UserIcon, UserLock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";

export default function NewPost() {
    const { session, setPosts } = useAuth()
    const user = session.user

    const navigate = useNavigate()
    const textareaRef = useRef(null)

    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")

    const autoResize = () => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

    const handleNote = (e) => {
        setNote(e.target.value)
        autoResize()
    }

    const submitNote = async () => {
        
        const { error } = await supabase
            .from("posts")
            .insert({
                title,
                post: note,
                user_id: user.id
            })
        
        if (error) {
            console.error(error.message)
        } else {
            navigate('/app/profile')
        }
    }

    const handleBack =  async (e) => {        
        e.preventDefault()

        if (!note.trim()) {
            navigate(-1)
            return
        }

        const tempId = crypto.randomUUID()

        setPosts(p => [
            {
                id: tempId,
                title,
                post: note,
                optimistic: true
            },
            ...p,
        ])

        await submitNote()
        navigate('/app', { replace: true })
    }

    return(
        <motion.div 
            className="w-screen h-screen p-4"
        >
            <div className="size-full relative flex flex-col">
                <header className="flex">
                    <div className="flex-1">
                        <button className="w-auto p-0 border-0"
                        onClick={handleBack}>
                            <ChevronLeft />
                        </button>
                    </div>

                    <div>
                        <Ellipsis />
                    </div>
                </header>

                <div className=" h-full overflow-y-auto
                no-scrollbar p-4">
                    <div className="mb-4">
                        <input placeholder="Title" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent shadow-none p-0
                        focus:ring-0 rounded-none text-[2rem]" />
                    </div>

                    <div className="h-auto">
                        <textarea placeholder="Note" 
                        className="resize-none focus:ring-0 
                        outline-none w-full" 
                        ref={textareaRef} value={note}
                        onChange={handleNote}/>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}