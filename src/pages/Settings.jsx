import { 
    Bolt, ChevronRight, CircleUser, 
    Eye, Languages, LogOut, Palette, Shield 
} from "lucide-react"
import { useAuth } from "../AuthProvider"
import { motion, AnimatePresence } from "motion/react"
import { supabase } from "../data/supabase-client"

export default function Settings() {
  const options = [
    { name: "Themes", icon: Palette },
    { name: "Settings", icon: Bolt },
    { name: "Visibility", icon: Eye },
    { name: "Privacy", icon: Shield  },
    { name: "Language", icon: Languages },
    { name: "Log out", icon: LogOut },
  ]

  const { profile, name, isGuest } = useAuth()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return(
    <div className="flex flex-col w-dvw h-dvh">
      <div className="flex gap-1 items-center px-3 border-b-1 border-neutral-700">
        <CircleUser className="text-black size-15 pr-4"/>
        <h2 className="text-black">
            Log in or sign up
        </h2>
        <ChevronRight className="text-black size-5"/>
      </div>   

      {options.map((o) => (
        <motion.div 
          key={o.name}
          className="flex gap-2 py-3 p-2 border-b-1 border-neutral-700"
          whileTap={{ backgroundColor: "#c4c4c4" }}
        >
          <button><o.icon /></button>
          <span>{o.name}</span>
        </motion.div>
      ))}
      <button onClick={() => logout()} className="border-2">Log out</button>
    </div>
    )
}