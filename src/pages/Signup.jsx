import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider"
import basta from "/ewan.jfif"
import MotionLink from "../ui/MotionLink"
import Interface from '../ui/Interface.jsx'
import DesktopAuth from "../ui/DesktopAuth.jsx"
import SignupForm from "../ui/SignupForm.jsx"

export default function Signup() {
    const { session } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()
        setErrors({})
        setLoading(true)

        const newErrors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = "Invalid email.";

        if (!password) newErrors.password = "Password cannot be empty.";
        else if (password.length < 8) newErrors.password = "Password too short (min 8 chars).";
        else if (!/[0-9]/.test(password)) newErrors.password = "Password must include at least one number.";
        else if (/\s/.test(password)) newErrors.password = "Password cannot include a space.";

        if (password !== confirmPass) newErrors.confirmPass = "Passwords do not match.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setErrors({ form: error.message })
            setLoading(false)
            return
        }
        navigate("/auth-intermission", { replace: true })
        setLoading(false)
    }
   
    useEffect(() => {
        if (session) {
            navigate("/auth-intermission", { replace: true })
        }
    }, [session])

    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const timer = setTimeout(() => setErrors({}), 6000);
        return () => clearTimeout(timer);
    }, [errors]);

    return(
        <Interface closable={true}>
            <div className="block md:hidden size-full p-3 border-1 border-white/12 rounded bg-neutral-950">
                <motion.form
                    initial={{ opacity: 0.7, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }} 
                    className="size-full flex flex-col justify-center gap-3" 
                    onSubmit={handleSignup}
                >
                    <div className="flex items-center justify-center">
                        <img src={basta} className="rounded-full size-25" />
                    </div>

                    <SignupForm />
                </motion.form>
            </div>
        </Interface>
    )
}
   