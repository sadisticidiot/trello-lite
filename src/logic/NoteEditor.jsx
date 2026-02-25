import { useRef, useState, useEffect } from "react";
import BottomSheet from "../ui/BottomSheet";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";
import clsx from "clsx";

export default function NoteEditor() {
  const { session } = useAuth()
  if (!session) return null
  const user = session.user

  const location = useLocation()
  const navigate= useNavigate()
  const [searchParams] = useSearchParams()

  const mode = searchParams.get("add_note")
  const noteId = searchParams.get("note_id")
  const isNew = mode === "new"
  const isUpdate = mode === "update" && noteId

  const textareaRef = useRef(null)
  const origNoteRef = useRef(null)

  const [note, setNote] = useState({ title: "", desc: "" })
  const [isLoading, setIsLoading] = useState(true)

  // Fetch notes on render
  useEffect(() => {
    if (isNew) {
      origNoteRef.current = { title: "", desc: "" }
      setIsLoading(false)
      return
    }

    if (!isUpdate) return

    const fetchNote = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, post, id")
        .eq("id", noteId)
        .single()

      if (!error && data) {
        const formatted = {
          title: data.title,
          desc: data.post
        }
        setNote(formatted)
        origNoteRef.current = formatted
      }
      setIsLoading(false)
    }
    fetchNote()
  }, [isNew, isUpdate, noteId])

  useEffect(() => {
    autoResize()
  }, [note.desc])

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  const handleDesc = (e) => {
    setNote(n => ({ ...n, desc: e.target.value }))
    autoResize()
  }

  const isChanged = () => {
    if (!origNoteRef.current) return true
    return(
      note.title !== origNoteRef.current.title ||
      note.desc !== origNoteRef.current.desc
    )
  }

  const submitNote = async () => {
    if (isNew) {
      return supabase
        .from("posts")
        .insert({
          title: note.title,
          post: note.desc,
          user_id: user.id
        })
    }

    return supabase
      .from("posts")
      .update({
        title: note.title,
        post: note.desc,
      })
      .eq("id", noteId)
      .single()
  }

  const closeSheet = async (e) => {
    e?.preventDefault?.()

    if (!note.desc || !isChanged()) {
      navigate(location.pathname, { replace: true })
      return
    }

    await submitNote()
    setNote({ title: "", desc: "" })
    navigate(location.pathname, { replace: true })
  }

  return(
    <BottomSheet closeSheet={closeSheet}>
      <div className="rounded-full bg-neutral-400 h-1 w-10 mb-4" />

      {isLoading ? (
        <div className="size-full flex items-center justify-center">
          <span className="spinner border-neutral-800 border-l-0" />
        </div>
      ) : (
        <>
          <input 
            value={note.title}
            onChange={(e) => setNote(n => ({ ...n, title: e.target.value }))}
            placeholder="Title" 
            className={clsx(
              "input-base",
              "placeholder:text-neutral-600/50 text-black w-full text-xl border-b-1",
              note.title ? "border-black" : "border-neutral-600/50"
            )}
          />
        
          <textarea 
            value={note.desc}
            ref={textareaRef}
            onChange={handleDesc}
            placeholder="Say something..."
            className="placeholder:text-neutral-600/50 text-black w-full input-base" 
          />
        </>
      )}
    </BottomSheet>
  )
}