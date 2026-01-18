import { Link } from "react-router-dom"
import { useAuth } from "../AuthProvider"

export default function FinishSetup() {
    const { session } = useAuth()
    const user = session.user

    return(
        <header>
            <h1>Setup your password</h1>
            <h2>Successfully logged in. To proceed, please check the email sent to {user.email}. Passwords are optional when using Google accounts but without one, you'll have to log in using OAuth everytime.</h2>
            <div className="flex justify-between items-center mt-2">
                <Link className="font-light text-blue-400 underline">Set password</Link>
                <Link to="/create-account" className="font-light text-blue-400 underline">Maybe Later</Link>
            </div>
        </header>
    )
}