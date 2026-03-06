import { useState } from "react"
import { useNotesLogic } from "../logic/NotesLogic"
import { ALargeSmall } from "lucide-react"
import NotesPreview from "../logic/NotesPreview"

export default function DesktopNotes() {
  const { notesSource, handleClick, currentNote } = useNotesLogic()
  return(
    <div className="hidden md:grid grid-cols-2 h-full">
      {/* Notes Display */}
      <div className="overflow-y-auto h-full flex flex-col border-1 border-neutral-400">
        <h1 className="font-bold text-3xl border-b-1 border-neutral-400 p-2 pt-3">
          Notes
        </h1>

        <div className="overflow-y-auto">
          <div className="flex flex-col gap-5">
            {notesSource.map(note => (
              <div 
                key={note.id}
                onClick={() => handleClick(note.id)}
                className="flex flex-col p-2"
              >
                <h1 className="font-semibold text-xl">{note.title}</h1>
                <span className="text-neutral-600">{note.post}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Preview */}
      <div className="h-full flex flex-col gap-2 p-2 items-center justify-center">
        {currentNote ? (
          <NotesPreview />
        ) : (
          <>
            <ALargeSmall />
            <h1>View and edit your notes here</h1>    
          </>
        )}
      </div>
    </div>
  )
}