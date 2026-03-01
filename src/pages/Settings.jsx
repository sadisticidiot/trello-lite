import { 
    Bolt, ChevronRight, CircleUserRound, 
    Construction, Eye, Languages, LogOut, 
    Palette, ShieldX
} from "lucide-react"
import { useAuth } from "../AuthProvider"
import { motion, AnimatePresence } from "motion/react"
import { supabase } from "../data/supabase-client"
import { useNavigate } from "react-router-dom"

export default function Settings() {
  const navigate = useNavigate()

  const options = [
    { name: "Themes", icon: Palette },
    { name: "Settings", icon: Bolt },
    { name: "Visibility", icon: Eye },
    { name: "Privacy", icon: ShieldX  },
    { name: "Language", icon: Languages },
    { name: "Log out", icon: LogOut },
    { name: "Work in progress", icon: Construction },
  ]

  const { profile, name, isGuest } = useAuth()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return(
    <div className="flex flex-col w-dvw h-dvh">
      <div 
        className="flex flex-col m-2 p-3 py-2 gap-3
        border-1 border-neutral-700 rounded-xl"
      >
        <motion.div 
          onClick={() => navigate('/signup')}
          className="flex gap-2 items-center justify-center"
        >
          <CircleUserRound className="size-13"/>
          <h2 className="text-black">
              Log in or sign up
          </h2>
          <ChevronRight className="size-5"/>
        </motion.div>
        
        <h3 className="text-[14px]">
          You are currently browsing as a 
          <span className="font-bold"> guest</span>. 
          Notes you create will only be 
          <span className="font-bold"> saved locally on this device</span>.
          For a better experience, sign up today!
        </h3>
      </div>   

      {options.map((o) => (
        <motion.div 
          key={o.name}
          className="flex gap-2 p-3"
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