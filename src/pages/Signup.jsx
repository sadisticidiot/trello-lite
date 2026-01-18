import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider"
import basta from "/ewan.jfif"

export default function Signup() {
    const { session } = useAuth()
    const navigate = useNavigate()
    const MotionLink = motion(Link)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [holding, setHolding] = useState(false)
    const [btnHolding, setBtnHolding] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()
        setErrors({})
        setLoading (true)

        const newErrors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = "Invalid email.";

        if (!password) newErrors.password = "Password cannot be empty.";
        else if (password.length < 8) newErrors.password = "Password too short (min 8 chars).";

        if (password !== confirmPass) newErrors.confirmPass = "Passwords do not match.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/login`
            }
        })

        if (error) {
            setErrors({ form: error.message })
            setLoading(false)
            return
        }
        setLoading(false)
        setSubmitted(true)
    }

    useEffect(() => {
        if (session) {
            navigate("/app", { replace: true })
        }
    }, [session])
      
    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const timer = setTimeout(() => setErrors({}), 6000);
        return () => clearTimeout(timer);
    }, [errors]);

    if (submitted) {
        return(
            <div className="relative size-full">
                <h1>Signed up succesfully. To proceed, please check the email verification sent to {email}.</h1>
            </div>                
        )
    }

    return(
        <form className="fixed inset-0  flex flex-col justify-between items-center bg-neutral-900">
            <header className="relative flex w-full items-center justify-center">
                <Link to='/' className="absolute left-3">
                    <XMarkIcon className="size-[15px]"/>
                </Link>

                <h1>Create your account</h1>
            </header>

            <div className="rounded-lg flex flex-1 flex-col items-center justify-center gap-2 w-99/100 p-3 bg-neutral-950">
                <img src={basta} className="rounded-full size-25"/>

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
                        transition={{ duration: 0.12, ease: "easeIn"}}
                        className={clsx(errors.email && "border-2")}
                        
                    />
                    <AnimatePresence>
                        {errors.email && 
                            <motion.p 
                                className="text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeIn" }}   
                            >
                                {errors.email}
                            </motion.p>}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col w-full">
                    <motion.input 
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
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
                        transition={{ duration: 0.12, ease: "easeIn"}}
                        className={clsx(errors.password && "border-2")}
                        
                    />
                    <AnimatePresence>
                        {errors.password && 
                            <motion.p 
                                className="text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeIn" }}   
                            >
                                {errors.password}
                            </motion.p>}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col w-full mb-2">
                    <motion.input 
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="off"
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
                        transition={{ duration: 0.12, ease: "easeIn"}}
                        className={clsx(errors.confirmPass && "border-2")}
                        
                    />
                    <AnimatePresence>
                        {errors.confirmPass && 
                            <motion.p 
                                className="text-red-400"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeIn" }}   
                            >
                                {errors.confirmPass}
                            </motion.p>}
                    </AnimatePresence>
                </div>

                <motion.button 
                    onTapStart={() => setBtnHolding(true)}
                    onTapCancel={() => setBtnHolding(false)} 
                    onTap={() => setBtnHolding(false)} 
                    animate={{ 
                        scale: btnHolding ? 0.96 : 1,
                        backgroundColor: btnHolding ? "#111111" : "#171717"
                    }}
                    disabled={loading} 
                    onClick={handleSignup} 
                    className={clsx(
                        "flex gap-3 items-center justify-center",
                        loading && "cursor-default border-none bg-neutral-900 scale-98",
                    )}
                >
                    {loading ? (
                        <>
                            Signing up...
                            <span className="spinner" />
                        </>
                    ) : (
                        <>
                            Sign up
                        </>
                    )}
                </motion.button>

                <AnimatePresence>
                    {errors.form && 
                        <motion.p 
                            className="text-red-400 text-center"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2, ease: "easeIn" }}   
                        >
                            {errors.form}
                        </motion.p>}
                </AnimatePresence>

                <MotionLink
                    to="/signin"
                    onTapStart={() => setHolding(true)}
                    onTapCancel={() => setHolding(false)} 
                    onTap={() => setHolding(false)} 
                    animate={{ 
                        scale: holding ? 0.96 : 1,
                        color: holding ? "#e7e7e7b2" : "#ffffff"
                    }} 
                    className="text-sm text-center w-25"
                >
                    Sign in instead?
                </MotionLink>
            </div>

            <footer className="flex items-end justify-center py-1">
                <span className="text-white/30 text-sm text-center flex justify-center items-center gap-1">
                    This is a prototype created by Fizz 
                    <FaceSmileIcon className="size-[15px]"/>
                </span>
            </footer>
        </form>
    )
}