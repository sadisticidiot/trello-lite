import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider"
import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import ewan from "/ewan.jfif"

export default function PageLoadguard() {
  const { session, loading } = useAuth() // 👈 make sure your AuthProvider exposes a loading state
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (loading) return // wait until auth is fully initialized

    const decide = async () => {
      if (!session) {
        navigate("/signin", { replace: true })
        return
      }

      const userId = session.user.id
      const { data, error } = await supabase
        .from("users")
        .select("display_name, has_password")
        .eq("user_id", userId)
        .single()

      if (error) {
        console.error(error.message)
        navigate("/signin", { replace: true })
        return
      }

      if (!data || !data.display_name) {
        navigate("/create-account", { replace: true })
      } else if (!data.has_password) {
        navigate("/finish-setup", { replace: true })
      } else {
        navigate("/app", { replace: true })
      }

      setChecking(false)
    }

    decide()
  }, [session, loading])

  if (checking) {
    return (
      <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center">
        <img src={ewan} className="size-30 spinner"/>
        <span className="text-white/60">Finding my missing sock...</span>
      </div>
    )
  }

  return null
}
