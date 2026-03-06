import { useEffect, useRef, useState } from "react";
import { X, Search, Ellipsis, FolderOpen, SquarePen, HeartPulse } from "lucide-react"
import { motion } from "motion/react";
import { useNotesLogic } from "../logic/NotesLogic";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const { 
    selected, setSelected,
    searchInput, setSearchInput,
    setIsGrouping 
  } = useNotesLogic()

  const navigate = useNavigate()
  const location = useLocation()
  const loc = location.pathname

  const inputRef = useRef(null)
  const [isDropdown, setIsDropdown] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isHeader, setIsHeader] = useState(true)

  const options = [
    { name: "Set to private"  },
    { name: "Archive" },
    { name: "Delete" },
  ]

  // auto focus on search 
  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearch])

  useEffect(() => {
    if (selected.length === 0) {
      setIsHeader(true)
      return
    }
    setIsHeader(false)
    return
  }, [selected])

  return(
    <>
      <div className="block md:hidden">
        {isHeader && (
          <div className="p-2 pb-1 border-b-1 border-neutral-400">
            {isSearch ? (
              <div
                className="flex w-full border-1 border-neutral-400 
                rounded-full px-2 p-1 bg-neutral-200"
              >
                <input
                  ref={inputRef}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search" 
                  className="flex-1 input-base"
                />
                
                <button onClick={() => { setIsSearch(false); setSearchInput("") }}>
                  <X className="text-neutral-400"/>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2">
                <h1 className="font-bold leading-none text-[2rem]">missnakita</h1>

                <div className="flex gap-5 justify-end">
                  {loc === '/groups' ? (
                    <button onClick={() => navigate('/')}>
                      <SquarePen className="text-blue-700" />
                    </button>
                  ) : (
                    <button onClick={() => navigate('/groups')}>
                      <FolderOpen className="text-blue-700" />
                    </button>
                  )}
                  
                  <button onClick={() => setIsSearch(true)}>
                      <Search className="text-blue-700" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
            
        {!isHeader && (
          <motion.div 
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex gap-2 items-center p-2 py-3 border-b-1 border-neutral-400"
          >
            <button 
              onClick={() => { 
                setSelected([])
                setIsDropdown(false) 
                setIsHeader(true)
              }}
            >
              <X />
            </button>
      
            <span className="flex-1">{selected.length} items selected</span>
                
            <div className="relative">
              <button onClick={() => setIsDropdown(p => !p)}>
                <Ellipsis />
              </button>
      
              {isDropdown && 
                <div 
                  className="absolute w-max z-50 border-1 border-neutral-400 
                  shadow-md/30 bg-neutral-100 overflow-hidden rounded right-0"
                >
                  {selected.length > 1 && (
                    <button 
                      className="p-2 pr-4" 
                      onClick={() => {
                          setIsDropdown(false)
                          setIsGrouping(true)
                      }}
                    >
                      Group
                    </button>
                  )}
                  {options.map((o) => (
                    <div className="p-2 pr-4" key={o.name}>
                      <span>{o.name}</span>
                    </div>
                  ))}
                </div>
              }
            </div>
          </motion.div>
        )}
      </div>

      <div className="hidden md:flex flex-col gap-8 items-center border-r-1 border-neutral-400 pt-5 p-4">
        <HeartPulse />
        <button onClick={() => navigate('/')}>
          <SquarePen />
        </button>

        <button onClick={() => navigate('/groups')}>
          <FolderOpen />
        </button>
        <Search />
      </div>
    </>
  )
}