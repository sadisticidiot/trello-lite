import { useNavigate } from "react-router-dom"
import { useNotesLogic } from "../logic/NotesLogic"
import { BrushCleaning } from "lucide-react"

export default function Groups() {
  const { groups, setGroups } = useNotesLogic()
  const navigate = useNavigate()

  const empty = groups.length === 0

function NoResults() {
  return(
    <div className="h-full flex flex-col gap-2 items-center justify-center">
      <BrushCleaning className="text-neutral-500 size-10" />

      <span className="text-neutral-500">
        Nothing to see here
      </span>
    </div>
  )
}

  return(
    <div className="h-full flex flex-col gap-2">
      <button onClick={() => localStorage.removeItem("guest_groups")}>Empty groups</button>
      {empty ? (
        <NoResults />
      ) : (
        groups.map(group => (
          <div 
            onClick={() => navigate(`/view-group/${group.id}`)}
            key={group.id} 
            className="flex justify-between items-center 
            border-1 border-neutral-400 p-2 rounded-xl"
          >
            <h1 className="font-semibold text-[18px] line-clamp-2 text-ellipsis">{group.name}</h1>
            <span className="text-sm text-center text-neutral-600">{group.notes.length} notes</span>
          </div>
        ))
      )}
    </div>
  
  )
}