import { useAuth } from "../AuthProvider"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react";

export default function Notes() {
    const { posts } = useAuth()
    const navigate = useNavigate()

    const [holdingId, setHoldingId] = useState(null)

    return(
        <div className="columns-2 gap-4 pb-30">
            {posts.map((p) => {
                const holding = holdingId === p.id
                return(
                    <motion.div key={p.id} className="flex rounded-xl flex-col 
                    p-2 text-start border-2 border-white/40 cursor-pointer
                    break-inside-avoid mb-4 shadow-xl/30"
                    onTapStart={() => setHoldingId(p.id)}
                    onTapCancel={() => setHoldingId(null)} 
                    onTap={() => setHoldingId(null)} 
                    animate={{ 
                        scale: holding ? 0.96 : 1,
                        color: holding ? "#e7e7e7b2" : "#ffffff",
                        background: holding ? "#0e0e0e" : "#0a0a0a"
                    }}  
                    onClick={() => navigate(`/app/notepad/${p.id}`)}>
                        <h1 className="p-0 text-start text-[20px] pb-4">{ p.title ||"Untitled" }</h1>
                        <span className="text-neutral-200/95">{p.post}</span>
                    </motion.div>
                )
            })}
        </div>
    )
}