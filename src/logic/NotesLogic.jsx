import { 
  createContext, useContext, useEffect, useState, useRef 
} from "react";
import { useAuth } from "../AuthProvider"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../data/supabase-client";

const NotesContext = createContext(null)

export function NotesLogic({ children }) {
  const { session, guestNotes, setGuestNotes, posts, isGuest } = useAuth()
  const user = session?.user
  const notesSource = isGuest ? guestNotes : posts

  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // bottom sheet related params
  const mode = searchParams.get("add_note")
  const noteId = searchParams.get("note_id")
  const isNew = mode === "new"
  const isUpdate = mode === "update" && noteId


  const timerRef = useRef(null)
  const textareaRef = useRef(null)
  const origNoteRef = useRef(null)
  const longPressedRef = useRef(false)

  // grouping related states
  const [groups, setGroups] = useState(() => {
    const storedGroups = localStorage.getItem("guest_groups")
    return storedGroups ? JSON.parse(storedGroups) : []
  })
  const [groupName, setGroupName] = useState("")

  // note related states
  const [selected, setSelected] = useState([])
  const [pressedId, setPressedId] = useState(null)
  const [searchInput, setSearchInput] = useState("")
  const [note, setNote] = useState({ title: "", desc: "" })

  // sheet related states
  const [isLoading, setIsLoading] = useState(true)
  const [unfinished, setUnfinished] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isGrouping, setIsGrouping] = useState(false)

  // sheet related functions
  useEffect(() => {
    if (isGuest && isUpdate) {
      const found = guestNotes.find(n => n.id === noteId)

      if (found) {
        const formatted = {
          title: found.title,
          desc: found.post
        }

        setNote(formatted)
        origNoteRef.current = formatted
      }

      setIsLoading(false)
      return
    }

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
    setUnfinished(!!note.title && !note.desc.trim())
  }, [note.title, note.desc])
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
    if (isGuest) {
      if (isNew) {
        const newNote = {
          id: crypto.randomUUID(),
          title: note.title,
          post: note.desc,
          created_at: new Date().toISOString()
        }

        const updatedNotes = [newNote, ...guestNotes]
        setGuestNotes(updatedNotes)
        localStorage.setItem("guest_notes", JSON.stringify(updatedNotes))
        return
      }

      if (isUpdate) {
        const updatedNotes = guestNotes.map((n) => 
          n.id === noteId
            ? { ...n, title: note.title, post: note.desc }
            : n
        )
        
        setGuestNotes(updatedNotes)
        localStorage.setItem("guest_notes", JSON.stringify(updatedNotes))
        return
      }
    }

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
  const actuallyClose = async () => {
    if (!note.desc.trim() || !isChanged()) {
      navigate(location.pathname, { replace: true })
      return
    }

    await submitNote()
    setNote({ title: "", desc: "" })
    setUnfinished(false)
    navigate(location.pathname, { replace: true })
  }
  const attemptClose = async () => {
    if (unfinished) {
      setShowConfirm(true)
      return false
    }

    await actuallyClose()
    return true
  }

  // note's pointer events
  const handlePointerDown = (id) => {
    longPressedRef.current = false
    setPressedId(id)

    timerRef.current = setTimeout(() => {
      longPressedRef.current = true
      setPressedId(null)
      setSelected((prev) => prev.includes(id) ? prev : [...prev, id])
    }, 600)
  }
  const handlePointerLeave = () => {
    clearTimeout(timerRef.current)
    setPressedId(null)
  }
  const handleClick = (id) => {
    if (longPressedRef.current) {
      longPressedRef.current = false
      return
    }

    if (selected.length > 0 ) {
      setSelected((prev) => 
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      )
      return
    }
    setSearchParams({ add_note: "update", note_id: id })
  }

  // header related logic 
  const notesToSearch = notesSource
  const noResults = searchInput && searchedTitles.length === 0
  const handleSaveGroup = () => {
    if (isGuest) {
      const newGroup = {
        id: Date.now(),
        name: groupName,
        notes: selected
      }
      const updatedGroups = [ newGroup, ...groups ]
      setGroups(updatedGroups)
      localStorage.setItem("guest_groups", JSON.stringify(updatedGroups))
      setIsGrouping(false)
      setSelected([])
      return
    }
  }

  // note rendering logic
  const groupedNoteIDs = groups.flatMap(group => group.notes)
  const notesToRender = notesSource.filter(note => 
    !groupedNoteIDs.includes(note.id)
  )
  const searchedTitles = searchInput ? notesToSearch.filter(n => 
      n.title?.toLowerCase().includes(searchInput.toLowerCase())
  ) : []

  return (
    <NotesContext.Provider 
      value={{ 
        noResults, notesToRender, searchedTitles, 
        setSearchInput,
        isGrouping, setIsGrouping, 
        selected, setSelected,
        pressedId,
        isLoading,
        note, setNote,
        textareaRef, handleDesc,
        groupName, setGroupName,
        groups, groupedNoteIDs,
        showConfirm, setShowConfirm,
        actuallyClose, attemptClose,
        handlePointerDown, handlePointerLeave, handleClick,  
        handleSaveGroup,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotesLogic() {
  return useContext(NotesContext)
}