import { X } from "lucide-react"
import { useNotesLogic } from "./NotesLogic"
import { useSearchParams } from "react-router-dom"

export default function NotesPreview() {
  const { 
    isChanged, attemptClose, setNote, textareaRef, 
    handleDesc, note
  } = useNotesLogic()


  const [searchParams, setSearchParams] = useSearchParams()

  const closeEditor = () => {
    searchParams.delete("note_id")
    searchParams.delete("add_note")
    setSearchParams(searchParams)
  }
  return(
    <>
      <div className="flex justify-between items-center w-full">
        <button onClick={closeEditor}>
          <X />
        </button>

        {isChanged() && 
          <button onClick={attemptClose}>
            Save
          </button>
        }
      </div>

      <input 
        value={note.title}
        placeholder="Title" 
        onChange={(e) => setNote(n => ({ ...n, title: e.target.value }) )}
        className="text-2xl w-full" 
      />

      <div className="w-full flex-1">
        <textarea 
          value={note.desc}
          ref={textareaRef}
          onChange={handleDesc}
          className="input-base"
         />
      </div>
    </>
  )
}