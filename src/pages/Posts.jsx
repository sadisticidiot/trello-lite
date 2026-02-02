import { useState } from "react"
import { useAuth } from "../AuthProvider"
import { useNavigate } from "react-router-dom"

export default function Posts() {
    const { posts } = useAuth()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    return(
        <div className="relative size-full flex items-center justify-center">
            {posts.length === 0 
                ? (
                    <span className="text-white/40">
                        No posts yet. Create your first one now!
                    </span>
                ) : (
                    <span>
                        {posts}
                    </span>
                )
            }

                    <button 
                        className="absolute bottom-4 right-4 size-12 rounded-full bg-neutral-200 border-black/30 p-0 text-black"
                        onClick={() => {navigate("/app/new-post"); setOpen(true)}}    
                    >
                        +
                    </button>
        </div>
    )
}