import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { supabase } from "../data/supabase-client"
import { useNavigate } from "react-router-dom"

export default function() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const handleGoogle = async (e) => {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/signup/create-account"
            }
        })

        if (error) {
            console.error(error.message)
        }
    }

    return(
        <div>
            <div className="flex flex-col gap-3 pb-2">
                <input 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                />
                <button>Sign up</button>
            </div>

            <div className="flex w-full items-center gap-2 my-2 pb-2">
                <hr className="border-t border-white/50 flex-1" />
                <p className="text-white/50">OR</p>
                <hr className="border-t border-white/60 flex-1" />
            </div>

            <button onClick={handleGoogle} className="flex gap-3 items-center justify-center">
                <EnvelopeIcon className="size-[25px]" />
                Continue with Google
            </button>
        </div>
    )
}