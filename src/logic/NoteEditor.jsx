import BottomSheet from "../ui/BottomSheet";
import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import { useNotesLogic } from "./NotesLogic";
import DiscardConf from "../ui/DiscardConf";

export default function NoteEditor() {
  const {
    isLoading,
    note, setNote,
    showConfirm,
    textareaRef, handleDesc
  } = useNotesLogic()

  return(
    <div className="block md:hidden">
      <AnimatePresence>
        {showConfirm && <DiscardConf />}
      </AnimatePresence>

      <BottomSheet>
        <div className="rounded-full bg-neutral-400 h-1 w-10 mb-4" />

        {isLoading ? (
          <div className="size-full flex items-center justify-center">
            <span className="spinner border-neutral-800 border-l-0" />
          </div>
        ) : (
          <>
            <input 
              value={note.title}
              onChange={(e) => setNote(n => ({ ...n, title: e.target.value }))}
              placeholder="Title" 
              className={clsx(
                "input-base",
                "placeholder:text-neutral-600/50 text-black w-full text-xl border-b-1",
                note.title ? "border-black" : "border-neutral-600/50"
              )}
            />
          
            <textarea 
              value={note.desc}
              ref={textareaRef}
              onChange={handleDesc}
              placeholder="Say something..."
              className="placeholder:text-neutral-600/50 text-black w-full input-base" 
            />
          </>
        )}
      </BottomSheet>
    </div>
  )
}