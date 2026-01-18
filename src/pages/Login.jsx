import { Link, useNavigate } from "react-router-dom";
import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import clsx from "clsx";
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";

export default function Login() {
    const { session } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (session) {
            navigate("/app", { replace: true })
        }
    }, [session])
    

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrors({})
        setLoading(true)

        const newErrors = {}

        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password) newErrors.password = "Password is required.";

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
        }

        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
        setErrors({ form: "Incorrect username or password. Please try again or create an account." });
        setLoading(false);
        return;
        }

        setLoading(false);
        navigate("/create-account", { replace: true });
    }

    return(
        <>
            <div className="block md:hidden fixed m-3 inset-0 flex flex-col justify-between">
                <header className="relative my-5 flex gap-2 items-center justify-center pb-2">
                    <Link to='/' className="fixed left-3">
                        <XMarkIcon className="size-[22px]"/>
                    </Link>
                    <h1 className="flex-1">Sign in</h1>
                </header>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <motion.input 
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
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
                            autoComplete="current-password"
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

                    <button 
                        disabled={loading} 
                        onClick={handleLogin} 
                        className={clsx(
                            "flex gap-3 items-center justify-center",
                            loading && "cursor-default border-none bg-neutral-900 scale-98",
                        )}
                    >
                        {loading ? (
                            <>
                                Signing in...
                                <span className="spinner" />
                            </>
                        ) : (
                            <>
                                Sign in
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

                <footer className="flex-1 flex items-end justify-center">
                    <span className="text-white/30 text-sm text-center flex justify-center items-center gap-1">
                        This is a prototype created by Fizz 
                        <FaceSmileIcon className="size-[15px]"/>
                    </span>
                </footer>
            </div>

            <div className="hidden md:block w-full">
                <div>
                    Hi
                </div>
            </div>
        </>
    )
}