import { useState } from "react"
import { useAuth } from "../AuthProvider"
import { useLocation, useNavigate } from "react-router-dom"

export default function Posts() {
    const { posts } = useAuth()
    const navigate = useNavigate()

    console.log(posts)


    return(
        <div className="size-full">
            <div className="relative size-full flex items-start justify-center p-4">
                <span className="text-white/40 text-center">
                    This entire UI will most likely be discarded and renewed altogether
                    (which hurts since I spent gruelling time pulling this one)
                </span>

                <button 
                    className="absolute bottom-25 right-4 size-12 rounded-full bg-neutral-200 border-black/30 p-0 text-black"
                    onClick={() => navigate('/app/new-post')}
                >
                    +
                </button>
            </div>
        </div>
    )
}