import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useNotesLogic } from "../logic/NotesLogic"
import { ChevronLeft, Ellipsis } from "lucide-react"

export default function ViewGroup() {
  const { id } = useParams()
  const { groups, notesSource } = useNotesLogic()
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const group = groups.find(g => g.id === id)
  const groupedNotes = notesSource.filter(note => group.notes.includes(note.id))

  return(
    <div className="fixed inset-0 z-30 bg-white flex flex-col">
      <div className="flex p-2 justify-between items-center">
        <ChevronLeft className="size-7" onClick={() => navigate('/groups')}/>
        <Ellipsis className="size-7"/>
      </div>

      <div className="flex flex-col gap-2 p-4 pt-0">
        <h1 className="font-bold text-2xl">{group.name}</h1>
        {groupedNotes.map(note => (
          <div 
            className="flex flex-col rounded-xl 
            border-neutral-400 border-1 p-2" 
            key={note.id}
            onClick={() => setSearchParams({
              add_note: "update", note_id: note.id
            })}
          >
            <span className="text-[20px] font-semibold line-clamp-1 text-ellipsis">
              {note.title}
            </span>

            <span className="line-clamp-4 text-ellipsis text-neutral-800">
              {note.post}
            </span>
          </div>
        ))}
      </div>
    </div>
    )
}