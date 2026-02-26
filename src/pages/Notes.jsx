import { useAuth } from "../AuthProvider"
import { useOutletContext, useSearchParams } from "react-router-dom"
import { motion } from "motion/react"
import { BrushCleaning } from "lucide-react"
import { useRef, useState } from "react"
import clsx from "clsx"

export default function Notes() {
  const { session, loading, posts } = useAuth()
  const { searchedTitles, searchInput } = useOutletContext() 
  const [, setSearchParams] = useSearchParams()

  const timerRef = useRef(null)
  const longPressedRef = useRef(false)

  const [selected, setSelected] = useState([])
  const [pressedId, setPressedId] = useState(null)

  if (!session || loading) return null

  const noResults = searchInput && searchedTitles.length === 0

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

  return (
    <div>
      {/* Notes Grid */}
      {posts.length === 0 || noResults ? (
        <div 
          className="h-110 flex flex-col gap-2 
          items-center justify-center"
        >
          <BrushCleaning className="text-neutral-500 size-10" />

          <span className="text-neutral-500">
            {noResults ? "No results found" : "No notes yet, activate your productiveness!"}
          </span>
        </div>
      ): (
        <div className="flex flex-col gap-2 px-2">
          {searchedTitles.length > 0 ? (
            searchedTitles.map((s) => renderCard(s))
          ) : (
            posts.map((p) => renderCard(p))
          )}
        </div>
      )}

    </div>
  )

  function renderCard(p) {
    const isSelected = selected.includes(p.id)
    const pressed = pressedId === p.id

    return (
      <motion.div
        key={p.id}
        onPointerDown={() => handlePointerDown(p.id)}
        onPointerUp={handlePointerLeave}
        onPointerLeave={handlePointerLeave}
        onClick={() => handleClick(p.id)}
        animate={{ 
          scale: pressed ? 0.98 : 1,
          backgroundColor: isSelected  ? "#cecece" : pressed ? "#e4e4e4" : "#fff"
        }}
        className={clsx(
          "flex flex-col p-2 relative border-neutral-400 rounded-xl",
          isSelected ? "border-0 shadow-md/20" : "border-1 shadow-md/10"
        )}
      >
        <h1 
          className="text-start text-black text-[20px] 
          font-semibold line-clamp-2 text-ellipsis"
        >
          {p.title || "Untitled"}
        </h1>

        <span className="text-neutral-800 line-clamp-4 text-ellipsis">
          {p.post}
        </span>
      </motion.div>
    )
  }
}