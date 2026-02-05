import { supabase } from "../data/supabase-client"

export default function Menu() {

    const handleOut = async () => {
        await supabase.auth.signOut()
    }

    return(
        <div className="size-full flex items-center justify-center p-5">
            <button onClick={handleOut}>Log out</button>
        </div>
    )
}