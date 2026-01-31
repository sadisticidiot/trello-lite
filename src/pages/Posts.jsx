import { useAuth } from "../AuthProvider"

export default function Posts() {
    const { posts } = useAuth()

    console.log(posts)

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
            <button className="absolute bottom-4 right-4 size-12 bg-neutral-900 p-0 rounded-full">+</button>
        </div>
    )
}