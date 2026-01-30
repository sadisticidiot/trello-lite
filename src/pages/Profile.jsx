import { supabase } from "../data/supabase-client"
import { useAuth } from "../AuthProvider"
import { Archive, Book, BookmarkIcon, Heart } from "lucide-react"
import minion from "/minions.png"

export default function Profile() {
    const { profile, name, profileLoading } = useAuth()  


    const handleOut = async () => {
        await supabase.auth.signOut()
    }

    return(
        <div className="size-full flex flex-col items-center justify-center pt-5 pb-0 overflow-y-auto gap-2">
            {profileLoading ? (
                <div className="size-20 rounded-full animate-pulse border-2 bg-neutral-900" />
                ) : (
                <img src={profile} className="w-20 rounded-full" />
            )}
            <h1>{name}</h1>
            
            <div className="flex-1 w-full">
                <header className="flex w-full py-3 justify-between items-center px-20 border-b-1 border-white/50">
                    <Book className="size-6" />
                    <Heart className="size-6" />
                    <BookmarkIcon className="size-6" />
                    <Archive className="size-6" />
                </header>

                <div className="flex-1 flex flex-col items-center justify-center p-2">
                    <img src={minion} className="spinner border-0 size-50" />

                    <h3 className="flex justify-center items-center gap-3 text-white/30">
                        Work in progress
                    </h3>
                </div>
            </div>
        </div>
    )
}