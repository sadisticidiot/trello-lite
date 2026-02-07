import { useAuth } from "../AuthProvider"

export default function Notes() {
    const { posts } = useAuth()
    return(
        <div className="grid grid-cols-2
        gap-4 pb-30">
            {posts.map((p) => (
                <div className="flex rounded-xl flex-col 
                p-2 text-start border-2 border-white/40">
                    <h1 className="p-0">{p.title}</h1>
                    <span>{p.post}</span>
                </div>
            ))}
        </div>
    )
}