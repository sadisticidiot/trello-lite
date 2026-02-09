import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeft, Ellipsis, Globe, UserIcon, UserLock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react"
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";

export default function Notepad() {
    const { activeNote, session, setPosts } = useAuth()
    const user = session.user

    const { id } = useParams()
    const isNew = id === "new"
    const navigate = useNavigate()
    const textareaRef = useRef(null)

    const [note, setNote] = useState({ title: "", post: "" })

    useEffect(() => {
        if (isNew) return

        const fetchNote = async () => {
            const { data, error } =  await supabase
                .from("posts")
                .select("title, post, id")
                .eq("id", id)
                .single()
            
                if (!error) setNote(data)
        }
        fetchNote()
    }, [id, isNew])

    useEffect(() => {
        autoResize()
    }, [note.post])

    const autoResize = () => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = "auto"
        el.style.height = `${el.scrollHeight}px`
    }

    const handleNote = (e) => {
        setNote(n => ({...n, post: e.target.value}))
        autoResize()
    }

    const submitNote = async () => {
        if (isNew) {
            return supabase.from("posts").insert({
                title: note.title,
                post: note.post,
                user_id: user.id
            })
        }

        return supabase.from("posts").update({
            title: note.title,
            post: note.post
        }).eq("id", id)
    }

    const handleBack =  async (e) => {        
        e.preventDefault()

        if (!note.post) {
            navigate(-1)
            return
        }

        const tempId = crypto.randomUUID()

        setPosts(p => [
            {
                id: tempId,
                title: note.title,
                post: note.post,
                optimistic: true
            },
            ...p,
        ])

        await submitNote()
        navigate('/app/profile', { replace: true })
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
                        <input placeholder="Title" value={note.title}
                        onChange={(e) => setNote(n => ({...n, title: e.target.value }))}
                        className="bg-transparent shadow-none p-0
                        focus:ring-0 rounded-none text-[2rem]" />
                    </div>

                    <div className="h-auto">
                        <textarea placeholder="Note" 
                        className="resize-none focus:ring-0 
                        outline-none w-full" 
                        ref={textareaRef} value={note.post}
                        onChange={handleNote}/>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}