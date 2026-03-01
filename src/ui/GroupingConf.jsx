import { useNotesLogic } from "../logic/NotesLogic";
import ConfPopup from "./ConfPopup";

export default function GroupingConf() {
  const { setIsGrouping, groupName, setGroupName, handleSaveGroup } = useNotesLogic()
  return(
    <ConfPopup closeConf={setIsGrouping}> 
      <h1 className="p-3 pb-0 text-center text-xl font-semibold">
        Group notes?
      </h1>

      <div className="p-4">
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Name of group"
          className="input-base ring-1 ring-neutral-400 rounded-[6px]
          bg-neutral-300 px-1 focus:ring-neutral-500" 
        />
      </div>

      <div className="border-t-1 border-neutral-400 grid grid-cols-2">
        <button
          className="border-r-1 border-neutral-400 p-2 text-red-700"
          onClick={() => setIsGrouping(false)}
        >
          Cancel
        </button>

        <button
          className="p-2 text-blue-700"
          onClick={handleSaveGroup}
        >
          Save
        </button>
      </div>
    </ConfPopup>
  )
}