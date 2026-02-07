import { Plus } from "lucide-react"
import { useAuth } from "../AuthProvider"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const item = {
  hidden: { opacity: 0, x: -150 },
  visible: { opacity: 1, x: 0 }
}

export default function Home() {
  const { posts } = useAuth()
  const navigate = useNavigate()
  
  return(
    <div className="relative h-full w-full">
      <motion.ul variants={container}
      initial="hidden" animate="visible"
      className="flex flex-col px-4 pb-30 py-2 gap-2">
        {posts.map((p) => (
          <motion.li key={p.id} variants={item}
          className="bg-neutral-900 flex flex-col rounded p-2">
            <h1 className="text-start pt-0">{p.title}</h1>
            <span className="break-words whitespace-pre-wrap">{p.post}</span>
          </motion.li>
        ))}
      </motion.ul>
      
      <button className="rounded-full bg-white p-3 
      fixed bottom-20 shadow-md shadow-neutral-900/30
      backdrop-blue-[2px] right-4 w-auto"
      onClick={() => navigate('/app/new-post')}>
        <Plus className="text-black"/>
      </button>
    </div>
  )
}