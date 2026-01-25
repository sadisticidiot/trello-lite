import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider"
import { useEffect } from "react"
import { supabase } from "../data/supabase-client"
import ewan from "/ewan.jfif"

export default function PageLoadguard() {
    const { session } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!session) return

        const decide = async () => {
        const userId = session.user.id

        const { data, error } = await supabase
            .from("users")
            .select("display_name, has_password")
            .eq("user_id", userId)
            .single()

        if (!data || !data.display_name) {
            navigate("/create-account", { replace: true })
        } else if (!data.has_password) {
            navigate("/finish-setup", { replace: true })
        } else {
            navigate("/app", { replace: true })
        }
        }

        decide()
    }, [session])
    
    return(
        <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center">
            <img src={ewan} className="size-30 spinner"/>
            <span className="text-white/60">Finding kung saan ba ako nagkulang...</span>
        </div>
    )
}