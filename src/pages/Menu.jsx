import { useAuth } from "../AuthProvider"

export default function Menu() {
    const { logout } = useAuth()

    return(
        <div className="size-full flex items-center justify-center p-5">
            <button onClick={logout}>Log out</button>
        </div>
    )
}