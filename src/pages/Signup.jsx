import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider"
import basta from "/ewan.jfif"
import MotionLink from "../ui/MotionLink"

export default function Signup() {
    const { session } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)
    const [btnHolding, setBtnHolding] = useState(false)

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
        <>
            <div className="block md:hidden size-full">
                <form 
                    className="size-full flex flex-col justify-center items-center gap-3" 
                    onSubmit={handleSignup}
                >
                    <img src={basta} className="rounded-full size-25" />

                    <div className="flex flex-col w-full">
                            <motion.input
                                type="email"
                                placeholder="Email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => {
                                    setErrors({})
                                    setEmail(e.target.value)
                                }}
                                animate={{
                                    borderColor: errors.email
                                        ? "rgba(251, 44, 54, 1)"
                                        : "rgba(251, 44, 54, 0)",
                                }}
                                transition={{ duration: 0.12, ease: "easeIn" }}
                                className={clsx(errors.email && "border-2")}
                            />

                            <AnimatePresence mode="wait">
                                {errors.email &&
                                    <motion.p
                                        className="text-red-400"
                                        initial={{ opacity: 0, y: -5}}
                                        animate={{ opacity: 1, y: 0}}
                                        exit={{ opacity: 0, y: -5}}
                                        transition={{ duration: 0.2, ease: "easeIn" }}
                                    >
                                        {errors.email}
                                    </motion.p>
                                }
                            </AnimatePresence>
                    </div>

                    <div className="flex flex-col w-full">
                            <motion.input
                                type="password"
                                placeholder="Create Password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => {
                                    setErrors({})
                                    setPassword(e.target.value)
                                }}
                                animate={{
                                    borderColor: errors.password
                                        ? "rgba(251, 44, 54, 1)"
                                        : "rgba(251, 44, 54, 0)",
                                }}
                                transition={{ duration: 0.12, ease: "easeIn" }}
                                className={clsx(errors.password && "border-2")}
                            />

                            <AnimatePresence mode="wait">
                                {errors.password &&
                                    <motion.p
                                        className="text-red-400"
                                        initial={{ opacity: 0, y: -5}}
                                        animate={{ opacity: 1, y: 0}}
                                        exit={{ opacity: 0, y: -5}}
                                        transition={{ duration: 0.2, ease: "easeIn" }}
                                    >
                                        {errors.password}
                                    </motion.p>
                                }
                            </AnimatePresence>
                    </div>

                    <div className="flex flex-col w-full">
                            <motion.input
                                type="password"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                value={confirmPass}
                                onChange={(e) => {
                                    setErrors({})
                                    setConfirmPass(e.target.value)
                                }}
                                animate={{
                                    borderColor: errors.confirmPass
                                        ? "rgba(251, 44, 54, 1)"
                                        : "rgba(251, 44, 54, 0)",
                                }}
                                transition={{ duration: 0.12, ease: "easeIn" }}
                                className={clsx(errors.confirmPass && "border-2")}
                            />

                            <AnimatePresence mode="wait">
                                {errors.confirmPass &&
                                    <motion.p
                                        className="text-red-400"
                                        initial={{ opacity: 0, y: -5}}
                                        animate={{ opacity: 1, y: 0}}
                                        exit={{ opacity: 0, y: -5}}
                                        transition={{ duration: 0.2, ease: "easeIn" }}
                                    >
                                        {errors.confirmPass}
                                    </motion.p>
                                }
                            </AnimatePresence>
                    </div>

                    <motion.button
                        onTapStart={() => setBtnHolding(true)}
                        onTapCancel={() => setBtnHolding(false)}
                        onTap={() => setBtnHolding(false)}
                        animate={{ 
                            scale: btnHolding || loading ? 0.98 : 1, 
                            backgroundColor: btnHolding ? "#111111" : loading ? "#0e0e0e" : "#171717"
                        }}
                        className={clsx(
                            "flex items-center justify-center",
                            loading && "border-black"
                        )}
                    >
                        {loading ? <span className="spinner" /> : "Sign up"}
                    </motion.button>

                    <MotionLink variant="signup"/>
                </form>
            </div>
        </>
    )
}
   