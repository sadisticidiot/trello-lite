import { Link } from "react-router-dom"
import { useAuth } from "../AuthProvider"
import MotionLink from "../ui/MotionLink"

export default function FinishSetup() {
    const { session } = useAuth()
    const user = session.user

    return(
        <header className="size-full flex flex-col p-8 justify-center items-center bg-neutral-950 gap-5">
            <div className="flex-1 text-justify flex flex-col items-center justify-center">
                <h1>Successfully logged in!</h1>
                <h2>
                    For easier accessibility, please check the email sent to {user.email}. 
                    Passwords are optional when using Google accounts but without one, you'll have to log in using OAuth everytime.
                </h2>
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
                <MotionLink variant="password" />
                <MotionLink variant="later"/>
            </div>
        </header>
    )
}