import { useAuth } from "../AuthProvider"
import { useRef, useState } from "react"
import { Navigate, useNavigate, useOutletContext } from "react-router-dom"
import { motion } from "motion/react"
import { supabase } from "../data/supabase-client"
import { Archive, ClipboardCheck, Trash2, ClipboardClock, Pin, BrushCleaning } from "lucide-react"

export default function Notes() {
  const { session, loading, posts, setPosts } = useAuth()
  const navigate = useNavigate()
  
  if (!session) return <Navigate to='/auth-intermission' />
  if (loading) return <Navigate to='/auth-intermission' />
  const user = session.user

  const timerRef = useRef(null)
  const longPressTriggered = useRef(false)
  const cardRefs = useRef({})

  const [pressingId, setPressingId] = useState(null)
  const [longPressId, setLongPressId] = useState(null)
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 })

  const handlePointerDown = (id) => {
    longPressTriggered.current = false
    setPressingId(id)

    timerRef.current = setTimeout(() => {
      longPressTriggered.current = true

      const rect = cardRefs.current[id].getBoundingClientRect()
      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2
      const cardCenterX = rect.left + rect.width / 2
      const cardCenterY = rect.top + rect.height / 2

      setCenterOffset({
        x: viewportCenterX - cardCenterX,
        y: viewportCenterY - cardCenterY,
      })

      setLongPressId(id)
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
    if (longPressTriggered.current) return
    navigate(`/app/notepad/${id}`)
  }

  const delNote = async (id) => {
    setPosts((p) => p.filter((post) => post.id !== id))

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) console.error(error)
  }

  const togglePin = async (id) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    const newPinnedState = !post.is_pinned

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, is_pinned: newPinnedState } : p
      )
    )

    const { error } = await supabase
      .from("posts")
      .update({ is_pinned: newPinnedState })
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) {
      console.error(error)

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, is_pinned: !newPinnedState } : p
        )
      )
    }
  }

  const handleArchived = async (id) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id 
          ? { ...p, is_archived: true, is_pinned: false } 
          : p
      )
    )

    const { error } = await supabase
      .from("posts")
      .update({ 
        is_archived: true, 
        is_pinned: false 
      })
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) {
      console.error(error.message)
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, is_archived: false }
            : p
        )
      )
    }
  }

  const activePosts = posts.filter((p) => !p.is_archived)
  const pinnedPosts = activePosts.filter((p) => p.is_pinned)
  const unpinnedPosts = activePosts.filter((p) => !p.is_pinned)
  const isLongPressedPinned = posts.find((p) => p.id === longPressId)?.is_pinned

  return (
    <div>
      {/* Notes Grid */}
      {activePosts.length === 0 ? (
        <div className="h-full flex flex-col gap-2 items-center justify-center">
          <BrushCleaning className="text-neutral-500 size-10" />

          <span className="text-neutral-500">
            No notes yet, activate your productiveness!
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          {unpinnedPosts.map((p) => renderCard(p))}
        </div>
      )}
    </div>
  )

  function renderCard(p) {
    const pressing = pressingId === p.id
    const longPressed = longPressId === p.id

    return (
      <motion.div
        key={p.id}
        whileTap={{ backgroundColor: "#c4c4c4"}}
        className="border-b-1 border-neutral-400 flex flex-col p-1"
        onClick={() => navigate(`${location.pathname}?add_note=update&note_id=${p.id}`)}
      >
        <h1 
          className="p-0 text-start text-black text-[20px] 
          font-semibold line-clamp-2 text-ellipsis"
        >
          {p.title || "Untitled"}
        </h1>

        <span 
          className="text-neutral-800 line-clamp-4 
          text-ellipsis"
        >
          {p.post}
        </span>
      </motion.div>
    )
  }
}
