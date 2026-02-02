import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewPost() {
    const [avatar, setAvatar] = useState(null)
    const [charName, setCharName] = useState("")

    return(
        <div className="size-full flex flex-col gap-5 justify-center items-center p-5">
            <div className="flex-1 size-full bg-neutral-900 border-1 border-white/20 rounded shadow-lg flex items-center justify-center p-4 gap-2">
                <div className="w-50 h-full flex flex-col justify-center items-center p-2">
                    <div className="w-full">
                        <UserIcon className="size-full" />
                   </div>
                   
                   <h1>{charName ? charName : <span className="text-white/20">Set Name</span>}</h1>
                </div>

                <div className="flex-1 h-full flex flex-col">

                </div>
            </div>

            <div className="flex-1 p-2 size-full bg-neutral-950 border-1 border-white/20 rounded shadow-lg">
                <input placeholder="Name" onChange={(e) => setCharName(e.target.value)} />
            </div>
        </div>
    )
}