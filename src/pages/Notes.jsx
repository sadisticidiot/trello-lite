import { motion } from "motion/react"
import { BrushCleaning, CircleQuestionMark } from "lucide-react"
import clsx from "clsx"
import { useNotesLogic } from "../logic/NotesLogic"
import GroupingConf from "../ui/GroupingConf"
import DesktopNotes from "../ui/DesktopNotes"

export default function Notes() {
  const { 
    noResults, notesSource, searchedTitles, 
    handlePointerDown, handlePointerLeave, handleClick,
    searchInput,
    isGrouping,
    selected, 
    pressedId,
  } = useNotesLogic()

  const empty = notesSource.length === 0
  const searchedResults = searchedTitles.length > 0

function NoResults() {
  return(
    <div className="h-full flex flex-col gap-2 items-center justify-center">
      {empty ? (
        <BrushCleaning className="text-neutral-500 size-10" />
      ) : (
        <CircleQuestionMark className="text-neutral-500 size-12" />
      )}

      <span className="text-neutral-500">
        {empty 
          ? "No notes yet" 
          : <div className="flex gap-1">
            You have no note/s titled
            <span className="text-black font-semibold">
              '{searchInput}'
            </span>
          </div>
        }
      </span>
    </div>
  )
}

  return (
    <>
      {isGrouping && <GroupingConf />}

      {empty || noResults ? ( 
        <NoResults /> 
      ) : (
        <>
          <div className="flex flex-col gap-2 md:hidden">
            {searchedResults ? (
              searchedTitles.map(title => renderCard(title))
            ) : (
              notesSource.map(notes => renderCard(notes))
            )}
          </div>

          <DesktopNotes />
        </>
      )}
    </>
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
          backgroundColor: 
            isSelected  
            ? "#c4c4c4" 
            : pressed ? 
            "#e4e4e4" 
            : "#fff"
        }}
        className={clsx(
          "flex flex-col p-2 relative border-neutral-400 rounded-xl",
          isSelected 
            ? "border-0 shadow-md/20" 
            : "border-1 md:border-0 md:shadow-none shadow-md/10"
        )}
      >
        <h1 className="text-start text-[20px] font-semibold line-clamp-1 text-ellipsis">
          {p.title || "Untitled"}
        </h1>

        <span className="text-neutral-800 line-clamp-4 text-ellipsis">
          {p.post}
        </span>
      </motion.div>
    )
  }
}