import { Outlet } from "react-router-dom"
import { X, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../AuthProvider"

export default function Home() {
  const { posts, isGuest } = useAuth()
  const [guestNotes, setGuestNotes] = useState([])

  const inputRef = useRef(null)
  const [isSearch, setIsSearch] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    if (isGuest) {
      const stored = localStorage.getItem("guest_notes")
      if (stored) {
        setGuestNotes(JSON.parse(stored))
      }
    }
  }, [isGuest])

  const notesToSearch = isGuest ? guestNotes : posts
  
  const searchedTitles = searchInput ? 
    notesToSearch.filter(n => 
    n.title?.toLowerCase().includes(searchInput.toLowerCase())
  ) : []

  {/* Auto focus on search */}
  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearch])

  return (
    <div className="flex flex-col h-dvh">
      <div 
        className="flex items-center justify-between p-2 pb-1
        border-b-1 border-neutral-400"
      >
        {isSearch ? (
          <div 
            className="flex w-full border-1 border-neutral-400 
            rounded-full px-2 p-1"
          >
            <input
              ref={inputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search" 
              className="flex-1 input-base"
            />

            <button onClick={() => setIsSearch(false)}>
              <X className="text-neutral-400"/>
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-bold leading-none text-[2rem]">missnakita</h1>

            <button onClick={() => setIsSearch(true)}>
              <Search className="text-blue-700"/>
            </button>
          </>
        )}
      </div>
      
      {/* Children */}
      <div className="flex-1 flex flex-col pb-12 overflow-y-auto">
        <div className="shrink-0 h-3" />
        <Outlet context={{ searchedTitles, searchInput, guestNotes }}/>
      </div>
    </div>
  )
}