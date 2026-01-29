import { useNavigate } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import clsx from "clsx";
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";
import basta from "/ewan.jfif"
import MotionLink from "../ui/MotionLink";

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
    const [gglLoad, setGglLoad] = useState(false)
    const [btnHolding, setBtnHolding] = useState(false)
    const [gglHolding, setGglHolding] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const timer = setTimeout(() => setErrors({}), 6000);
        return () => clearTimeout(timer);
    }, [errors])
    
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
        navigate("/auth-intermission", { replace: true });
        setEmail("")
        setPassword("")
    }

    const handleGoogle = async (e) => {
        e.preventDefault()
        setGglLoad(true)

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth-intermission`
            }
        })

        if (error) {
            setErrors({ form: "Error logging in using Google" })
            setGglLoad(false)
            return 
        }
    }
    
    return(
        <>
            <div className="block md:hidden size-full">
                <form 
                    className="size-full flex flex-col justify-center items-center gap-3" 
                    onSubmit={handleLogin}
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

                            <AnimatePresence mpde="wait">
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
                                placeholder="Password"
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

                            <AnimatePresence mpde="wait">
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

                    <motion.button
                        onTapStart={() => setBtnHolding(true)}
                        onTapCancel={() => setBtnHolding(false)}
                        onTap={() => setBtnHolding(false)}
                        animate={{ 
                            scale: btnHolding || loading || gglLoad ? 0.98 : 1, 
                            backgroundColor: btnHolding || gglLoad ? "#111111" : loading ? "#0e0e0e" : "#171717"
                        }}
                        className={clsx(
                            "flex justify-center items-center",
                            loading && "border-black"
                        )}
                    >
                        {loading ? <span className="spinner" /> : "Sign in"}
                    </motion.button>

                    {errors.form && <span className="text-red-500">{errors.form}</span>}

                    <div className="flex w-full items-center gap-2 px-3 pt-3">
                        <hr className="border-t border-white/50 flex-1" />
                        <p className="text-white/50 text-xs">OR</p>
                        <hr className="border-t border-white/60 flex-1" />
                    </div>

                    <motion.button
                        type="button"
                        onClick={handleGoogle}
                        onTapStart={() => setGglHolding(true)}
                        onTapCancel={() => setGglHolding(false)}
                        onTap={() => setGglHolding(false)}
                        animate={{ 
                            scale: gglHolding || gglLoad || loading ? 0.98 : 1, 
                            backgroundColor: gglHolding || loading ? "#111111" : gglLoad ? "#0e0e0e" : "#171717"
                        }}
                        className={clsx(
                            "flex gap-2 items-center justify-center",
                            gglLoad && "border-black"
                        )}
                    >
                        {gglLoad ? <span className="spinner" /> : <><EnvelopeIcon className="size-8"/>Continue with Google</>}
                    </motion.button>

                    <MotionLink variant="login"/>
                </form>
            </div>
        </>
    )
}