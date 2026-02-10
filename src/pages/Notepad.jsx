import { ChevronLeft, Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react"
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";

export default function Notepad() {
    const { session, setPosts } = useAuth()
    const user = session.user

    const { id } = useParams()
    const isNew = id === "new"
    const navigate = useNavigate()

    const textareaRef = useRef(null)
    const origNoteRef = useRef(null)

    const [note, setNote] = useState({ title: "", post: "" })
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
        
    //check if a note exists and fetch it
    useEffect(() => {
        if (isNew) { 
            setLoading(false)
            return
        }

        const fetchNote = async () => {
            const { data, error } =  await supabase
                .from("posts")
                .select("title, post, id")
                .eq("id", id)
                .single()
            
            if (!error) {
                setNote(data)
                origNoteRef.current = {
                    title: data.title,
                    post: data.post
                }
            }
            setLoading(false)
        }
        fetchNote()
    }, [id, isNew])

    //resize the textarea on render
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

    //checks if a note has been edited
    const isChanged = () => {
        if (!origNoteRef.current) return true
        return(
            note.title !== origNoteRef.current.title ||
            note.post !== origNoteRef.current.post
        )
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
        .select()
        .single()
    }

    const handleBack =  async (e) => {        
        e.preventDefault()

        if (!note.post || !isChanged()) {
            navigate(-1)
            return
        }

        if (isNew) {
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
        } else {
            setPosts(p => p.map(post => 
                post.id === id ?
                    {...post, title: note.title, post: note.post}
                    : post
                )
            )
        }
        await submitNote()
        navigate('/app/profile', { replace: true })
    }

    const delNote = async () => {
        if (isNew) return

        setPosts(p => p.filter(post => post.id !== id))
        setIsOpen(false)

        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id)
            .select()
        
        if (error) {
            console.error(error)
            return
        } 
        navigate('/app/profile', { replace: true })
    }

    if (loading) {
        return(
            <div className="fixed inset-0 flex items-center justify-center">
                <span className="text-white/40">Fetching notes...</span>
            </div>
        )
    }

    return(
        <motion.div 
            className="w-screen h-screen p-4"
            initial={{ scale: 0.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <div className="size-full flex flex-col">
                <header className="flex">
                    <div className="flex-1">
                        <button className="w-auto p-0 border-0"
                        onClick={handleBack}>
                            <ChevronLeft />
                        </button>
                    </div>

                    <div className="relative">
                        <button className="w-auto p-0 border-0"
                        onClick={() => setIsOpen(p => !p)}>
                            <Ellipsis />
                        </button>
                        {isOpen && <div className="absolute right-0 bg-neutral-900
                        flex flex-col w-max rounded-md shadow-xl/30">
                            {!isNew && <button className="border-0 rounded-none"
                            onClick={delNote}>Delete Note</button>}
                            <button className="border-0 rounded-none">Change Theme</button>
                        </div>}
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