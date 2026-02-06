import { useAuth } from "../AuthProvider"

export default function Home() {
  const { posts } = useAuth()

  return(
    <div className="h-auto w-full">
      <div className="flex flex-col px-4 pb-30 py-2 gap-2">
        {posts.map((p) => (
          <div className="bg-neutral-900 flex flex-col rounded p-2">
            <h1 className="text-start pt-0">{p.title}</h1>
            <span className="break-words whitespace-pre-wrap">{p.post}</span>
          </div>
        ))}
      </div>
    </div>
  )
}