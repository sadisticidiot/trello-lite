import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import clsx from "clsx";
import { supabase } from "../data/supabase-client";
import MotionLink from "./MotionLink";
import { useSearchParams } from "react-router-dom";

export default function SignupForm() { 
    const [searchParams, setSearchParams] = useSearchParams()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({}) 
    const [confirmPass, setConfirmPass] = useState("")
    
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const timer = setTimeout(() => setErrors({}), 6000);
        return () => clearTimeout(timer);
    }, [errors])
    
    const handleSwitch = () => {
        searchParams.set("auth", "signin")
        setSearchParams(searchParams)
    }

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
   
    return(
        <form onSubmit={handleSignup} className="flex flex-col gap-2">
            <div className="flex flex-col">
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
                    className={clsx(errors.email && "border-2", "bg-neutral-950 inset-shadow-xl/30")}
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
            
            <div className="flex flex-col">
                <motion.input
                    type="Password"
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
                    className={clsx(errors.email && "border-2", "bg-neutral-950 inset-shadow-xl/30")}
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

            <div className="flex flex-col">
                <motion.input
                    type="Password"
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
                    className={clsx(errors.email && "border-2", "bg-neutral-950 inset-shadow-xl/30")}
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
                disabled={loading}
                whileTap={{ scale: 0.98, backgroudColor: "#111111" }}
                animate={{ 
                    scale: loading ? 0.98 : 1, 
                    backgroundColor: loading ? "#0e0e0e" : "#c6005c"
                }}
                className={clsx(
                    "flex items-center justify-center button-base",
                    loading && "border-black"
                )}
            >
                {loading ? <span className="spinner" /> : "Sign up"}
            </motion.button>
            
            <MotionLink variant="login" />
            <motion.button
                type="button" 
                whileTap={{ scale: 0.96, color: "#e7e7b2"}}
                className="text-sm hidden md:block w-auto"
                onClick={handleSwitch}
            >
                    Already have an account?
            </motion.button>
        </form>
    )
}