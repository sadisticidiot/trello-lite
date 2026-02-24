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
    <div className="size-full">
      {/* Overlay + Action Sheet */}
      {longPressId && (
        <>
          <div
            className="overlay z-30"
            onClick={() => setLongPressId(null)}
          />

          <div
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-60
            bg-neutral-900/95 rounded-xl p-3 pb-2 w-60 
            shadow-xl flex flex-col gap-2 backdrop-blur-[2px]"
          >
            <div className="flex justify-between">
              <button
                onClick={() => {
                  togglePin(longPressId)
                  setLongPressId(null)
                }}
              >
                {isLongPressedPinned ? (
                  <Pin className="text-white/10 fill-yellow-600" />
                ) : (
                  <Pin />
                )}
              </button>

              <button>
                <ClipboardCheck />
              </button>

              <button>
                <ClipboardClock />
              </button>

              <button 
                onClick={() => {
                  handleArchived(longPressId)
                  setLongPressId(null)
                }}
              >
                <Archive />
              </button>

              <button
                onClick={() => {
                  delNote(longPressId)
                  setLongPressId(null)
                }}
              >
                <Trash2 className="text-red-600"/>
              </button>
            </div>

            <button
              className="text-sm text-white/40"
              onClick={() => setLongPressId(null)}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Pinned Notes */}
        {pinnedPosts.length !== 0 && (
          <div 
            className="flex flex-col mb-6 pb-4 border-b-2 border-white/20"
          >
            <span className="text-start font-semibold mb-4">
              Pinned
            </span>
              <div className="columns-2">
                {pinnedPosts.map((p) => renderCard(p))}
            </div>
          </div>
        )}

      {/* Notes Grid */}
      {activePosts.length === 0 
       ? (
        <div 
          className="h-full flex flex-col gap-2 items-center justify-center"
        >
          <BrushCleaning className="text-neutral-500 size-10" />

          <span className="text-neutral-500">
            No notes yet, activate your productiveness!
          </span>
        </div>
       ) : (
        <div className="columns-2 md:columns-3 gap-4">
          {unpinnedPosts.map((p) => renderCard(p))}
        </div>
       )
      }
    </div>
  )

  function renderCard(p) {
    const pressing = pressingId === p.id
    const longPressed = longPressId === p.id

    return (
      <motion.div
        key={p.id}
        ref={(el) => (cardRefs.current[p.id] = el)}
        className="notes-base"
        onPointerDown={() => handlePointerDown(p.id)}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onClick={() => handleClick(p.id)}
        animate={{
          scale: longPressed
            ? 1.04
            : pressing
            ? 0.96
            : 1,
          x: longPressed ? centerOffset.x : 0,
          y: longPressed ? centerOffset.y : 0,
          zIndex: longPressed ? 30 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <h1 className="p-0 text-start text-[20px] pb-4 line-clamp-2">
          {p.title || "Untitled"}
        </h1>

        <span className="text-neutral-200/95 line-clamp-4 text-ellipsis">
          {p.post}
        </span>
      </motion.div>
    )
  }
}
