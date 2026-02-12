import { useNavigate } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import clsx from "clsx";
import { supabase } from "../data/supabase-client";
import { useAuth } from "../AuthProvider";
import basta from "/ewan.jfif"
import MotionLink from "../ui/MotionLink";
import Interface from "../ui/Interface";
import DesktopAuth from "../ui/DesktopAuth";

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

    const [btnLoad, setBtnLoad] = useState(false)
    const [gglLoad, setGglLoad] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0) return;

        const timer = setTimeout(() => setErrors({}), 6000);
        return () => clearTimeout(timer);
    }, [errors])
    
    const handleLogin = async (e) => {
        e.preventDefault()
        setErrors({})
        setBtnLoad(true)

        const newErrors = {}

        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password) newErrors.password = "Password is required.";

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setBtnLoad(false);
        return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
        setErrors({ form: "Incorrect username or password. Please try again or create an account." });
        setBtnLoad(false);
        return;
        }

        setBtnLoad(false);
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
            <div className="block md:hidden">
                <Interface closable={true}>
                    <div className="block md:hidden size-full p-3 border-1 border-white/12 rounded bg-neutral-950">
                        <motion.form
                            initial={{ opacity: 0.7, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }} 
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

                            <motion.button
                                disabled={btnLoad || gglLoad}
                                whileTap={{ scale: 0.98, backgroundColor: "#111111" }}
                                animate={{ 
                                    scale: btnLoad ? 0.98 : 1, 
                                    backgroundColor: btnLoad ? "#0e0e0e" : "#171717"
                                }}
                                className={clsx(
                                    "flex items-center justify-center",
                                    btnLoad && "border-black"
                                )}
                            >
                                {btnLoad ? <span className="spinner" /> : "Sign up"}
                            </motion.button>

                            <MotionLink variant="login"/>
                        </motion.form>
                    </div>
                </Interface>
            </div>

            <div className="hidden md:block">
                <DesktopAuth>
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
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

                    <div className="flex flex-col">
                        <motion.input
                            type="Password"
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

                    <motion.button
                        disabled={btnLoad || gglLoad}
                        whileTap={{ scale: 0.98, backgroudColor: "#111111" }}
                        animate={{ 
                            scale: btnLoad ? 0.98 : 1, 
                            backgroundColor: btnLoad ? "#0e0e0e" : "#171717"
                        }}
                        className={clsx(
                            "flex items-center justify-center",
                            btnLoad && "border-black"
                        )}
                    >
                        {btnLoad ? <span className="spinner" /> : "Sign up"}
                    </motion.button>

                    <MotionLink variant="login" />
                    </form>
                </DesktopAuth>
            </div>
        </>
    )
}