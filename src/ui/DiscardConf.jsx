import { useNotesLogic } from "../logic/NotesLogic";
import ConfPopup from "./ConfPopup";

export default function DiscardConf() {
  const { setShowConfirm, actuallyClose } = useNotesLogic()

  return(
    <ConfPopup closeConf={setShowConfirm}>
      <h1 className="p-3 pb-0 text-center text-xl font-semibold">
        Discard Changes
      </h1>  

      <h2 className="p-4 pt-2 text-center text-[15px]">
        Notes with only titles are not saved.
        Are you sure you want to close the sheet? 
        Your changes will be lost.
      </h2>

      <div className="grid grid-cols-2 border-t-1 border-neutral-400">
        <button
          className="p-2 text-blue-700 border-r-1 border-neutral-400"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </button>

        <button className="p-2 text-red-700"
          onClick={async () => {
            setShowConfirm(false)
            await actuallyClose()
          }}
        >
          Discard
        </button>
      </div>
    </ConfPopup>
  )
}