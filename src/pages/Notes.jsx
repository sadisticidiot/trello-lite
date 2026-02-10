import { useAuth } from "../AuthProvider"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
export default function Notes() {
    const { posts } = useAuth()
    const navigate = useNavigate()

    return(
        <div className="columns-2 gap-4 pb-30">
            {posts.map((p) => (
                <div key={p.id} className="flex rounded-xl flex-col 
                p-2 text-start border-2 border-white/40 cursor-pointer
                break-inside-avoid mb-4" 
                onClick={() => navigate(`/app/notepad/${p.id}`)}>
                    <h1 className="p-0 text-start text-[20px] pb-4">{ !p.title ? "Untitled" : p.title }</h1>
                    <span className="text-neutral-200/95">{p.post}</span>
                </div>
            ))}
        </div>
    )
}