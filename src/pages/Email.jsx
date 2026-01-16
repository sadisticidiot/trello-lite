import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { supabase } from "../data/supabase-client"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"

export default function() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)
    const [gglLoad, setGglLoad] = useState(false)
    const [submitted, setSubmitted] = useState(false)

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

    const handleGoogle = async (e) => {
        e.preventDefault()
        setGglLoad(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/signup/create-account"
            }
        })

        if (error) {
            console.error(error.message)
            setGglLoad(false)
            return 
        }
    }
    
    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const timer = setTimeout(() => setErrors({}), 6000);
        return () => clearTimeout(timer);
    }, [errors]);

    if (submitted) {
        return(
            <div className="fixed inset-0">
                <h1>Signed up succesfully. To proceed, please check the email verification sent to {email}.</h1>
            </div>                
        )
    }

    return(
        <form>
            <div className="flex flex-col gap-3 pb-2">
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
                            boxShadow: errors.email
                                ? "0 0 0 2px rgba(251, 44, 54, 1)"
                                : "0 0 0 0 rgba(251, 44, 54, 0)",
                        }}
                        transition={{ duration: 0.12, ease: "easeIn"}}
                        
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

                <div className="flex flex-col">
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
                            boxShadow: errors.password
                                ? "0 0 0 2px rgba(251, 44, 54, 1)"
                                : "0 0 0 0 rgba(251, 44, 54, 0)",
                        }}
                        transition={{ duration: 0.12, ease: "easeIn"}}
                        
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

                <div className="flex flex-col">
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
                            boxShadow: errors.confirmPass
                                ? "0 0 0 2px rgba(251, 44, 54, 1)"
                                : "0 0 0 0 rgba(251, 44, 54, 0)",
                        }}
                        transition={{ duration: 0.12, ease: "easeIn"}}
                        
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

                <button 
                    disabled={loading} 
                    onClick={handleSignup} 
                    className={clsx(
                        "flex gap-3 items-center justify-center",
                        loading && "cursor-default border-none bg-neutral-900 scale-98",
                        gglLoad && "cursor-disabled border-none bg-neutral-800"
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
                </button>

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
            </div>

            <div className="flex w-full items-center gap-2 my-2 pb-2">
                <hr className="border-t border-white/50 flex-1" />
                <p className="text-white/50">OR</p>
                <hr className="border-t border-white/60 flex-1" />
            </div>

            <button 
                type="button"
                disabled={gglLoad} 
                onClick={handleGoogle} 
                className={clsx(
                    "flex gap-3 items-center justify-center",
                    gglLoad && "cursor-default border-none bg-neutral-900 scale-98",
                    loading && "cursor-disabled border-none bg-neutral-800"
                )}
            >
                {gglLoad ? (
                    <span className="spinner" />
                ) : (
                    <>
                        <EnvelopeIcon className="size-[25px]" />
                        Continue with Google
                    </>
                )}
            </button>
        </form>
    )
}