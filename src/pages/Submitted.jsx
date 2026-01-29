import { useAuth } from "../AuthProvider"

export default function Submitted() {
    const { session } = useAuth()

    if (!session) return <div className="flex items-center justify-center"><span className="spinner" /></div>
    const user = session.user

    return(
        <div>
            <h1>Skibidi</h1>
        </div>
    )
}