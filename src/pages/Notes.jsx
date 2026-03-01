import { AnimatePresence, motion } from "motion/react"
import { BrushCleaning, ChevronRight } from "lucide-react"
import clsx from "clsx"
import { useNotesLogic } from "../logic/NotesLogic"
import GroupingConf from "../ui/GroupingConf"
import { useNavigate } from "react-router-dom"

export default function Notes() {
  const navigate = useNavigate()

  const { 
    noResults, notesToRender, searchedTitles, 
    handlePointerDown, handlePointerLeave, handleClick,
    isGrouping,
    selected, 
    pressedId,
    groups,
  } = useNotesLogic()

  return (
    <div>
      <div 
        className="flex justify-between items-center p-1 px-4 
        border-1 border-neutral-400 rounded-full cursor-pointer mb-2"
        onClick={() => navigate('/groups')}
      >
        <h1 className="font-semibold">Go to groups</h1>
        <ChevronRight />
      </div>

      {notesToRender.length === 0 || noResults ? (
        <div className="h-110 flex flex-col gap-2 items-center justify-center">
          <BrushCleaning className="text-neutral-500 size-10" />

          <span className="text-neutral-500">
            {noResults ? 
              "No results found" 
              : "No notes yet, activate your productiveness!"
            }
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">

        <div className="flex flex-col gap-2">
          {searchedTitles.length > 0 ? (
            searchedTitles.map((s) => renderCard(s))
          ) : (
            <>
              {groups.length > 0 && notesToRender.length > 0 &&
                <h1 className="font-bold">Notes</h1>
              }

              {notesToRender.map((p) => renderCard(p))}
              
              <AnimatePresence>
                {isGrouping && <GroupingConf />}
              </AnimatePresence>
            </>
          )}
        </div>
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
          backgroundColor: isSelected  ? "#c4c4c4" : pressed ? "#e4e4e4" : "#fff"
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