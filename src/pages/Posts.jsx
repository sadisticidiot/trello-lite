import { useState } from "react"
import { useAuth } from "../AuthProvider"
import { useLocation, useNavigate } from "react-router-dom"

export default function Posts() {
    const location = useLocation()
    const { posts } = useAuth()
    const navigate = useNavigate()


    return(
        <div className="size-full">
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
                    className="absolute bottom-18 right-4 size-12 rounded-full bg-neutral-200 border-black/30 p-0 text-black"
                    onClick={() => {
                        const params = new URLSearchParams(location.search)
                        params.set("sheet", "new-post")
                        navigate(`?${params.toString()}`)
                    }}
                >
                    +
                </button>
            </div>
        </div>
    )
}