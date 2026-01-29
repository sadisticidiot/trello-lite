import { useEffect, useState } from "react"
import { useAuth } from "../AuthProvider"
import MotionLink from "../ui/MotionLink"
import { AnimatePresence, motion } from "motion/react"
import { supabase } from "../data/supabase-client"
import { useNavigate } from "react-router-dom"
import Interface from "../ui/Interface"

export default function FinishSetup() {
    const { session, loading } = useAuth()

    const user = session.user

    const navigate = useNavigate()

    const [newPass, setNewPass] = useState("")
    const [passStrength, setPassStrength] = useState("")
    const [error, setError] = useState()

    const [score, setScore] = useState(0)

    const [btnHolding, setBtnHolding] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const calcScore = (pass) => {
        let s = 0

        if (pass.length > 5) s++
        if (pass.length >= 8) s++
        if (/[0-9]/.test(pass)) s++
        if (/[A-Z]/.test(pass)) s++
        if (/\s/.test(pass)) s -= 2
        return s
    }

    const checkStr = (pass) => {
        if (!pass) {
            setPassStrength("Decisions, decisions...")
        } else if (pass.length < 8) {
            setPassStrength("Password is too short (min. 8 chars).")
        } else if (!/[0-9]/.test(pass)) {
            setPassStrength("Password must include at least one number.")
        } else if (/\s/.test(pass)) {
            setPassStrength("Password cannot include a space.")
        } else if (!/[A-Z]/.test(pass)) {
            setPassStrength("Strong password 💪 (optional: Capital letters)")
        } else {
            setPassStrength("Strong password 💪")
        }
    }

    const handleInput = (e) => {
        const password = (e.target.value)

        setNewPass(password)
        checkStr(password)
        setScore(calcScore(password))
    }

    const handleCreate = async (e) => {
        e.preventDefault()

        if (!passStrength.includes("Strong password 💪")) {
            setError("Please enter a strong password before continuing.")
            return
        }

        setError()
        setBtnLoading(true)

        const { error: supabaseError } = await supabase.auth.updateUser({ password: newPass })

        if (supabaseError) {
            console.error(supabaseError.message)
            setError("An unexpected error occured. Please try again.")
            setBtnLoading(false)
            return
        } else {
            const { error: savePassErr } = await supabase
                .from("users")
                .update({ has_password: true })
                .eq("user_id", user.id)

            if (savePassErr) {
                setError("There was an issue saving your password. Please try again later.")
            }
            navigate("/auth-intermission", { replace: true })
        }
    }

    useEffect(() => {
        if (!session) return

        const check = async () => {
            const { data, error } = await supabase
                .from("users")
                .select("has_password")
                .eq("user_id", user.id)
                .single()
            
            if (data.has_password) {
                navigate("/auth-intermission", { replace: true })
            } else {
                setSuccess(true)
            }
        }
        check()
    }, [session])

    const strColor = 
        passStrength.includes("decisions...") 
        ? "#737373" 
        : passStrength.includes("Strong") 
        ? "#22c55e"
        : "#ef4444"
    
    const barWidth = score * 25 + "%"

    if (loading) return
    
    return(
        <>
        <Interface closable={false}>
            <div className="block md:hidden size-full p-3 border-1 border-white/12 rounded bg-neutral-950">
                <div className="size-full flex flex-col p-8 justify-center items-center bg-neutral-950 gap-5">
                    <div className="flex-1 text-center flex flex-col items-center justify-center">
                        <h1>Successfully logged in!</h1>
                        <h2>
                            lagyan mo ng password para ano, para maangas.
                            pwede ring wag kung ayaw mo...
                        </h2>
                    </div>

                    <div className="flex flex-col justify-between items-center gap-2 w-full">
                        <p className="text-sm text-white/20">Currently logged in as {user.email}</p>

                        <div className="flex flex-col w-full">
                            <motion.input
                                placeholder="Enter password here"
                                autoComplete="new-password"
                                value={newPass}
                                onChange={handleInput}
                            />

                            <div className="flex flex-col items-center justify-center gap-2 p-2">
                                <motion.p 
                                    className="text-xs"
                                    initial={{ opacity: 0 }}
                                    animate={{ color: strColor, opacity: 1 }}
                                >
                                    {passStrength}
                                </motion.p>

                                <div className="flex items-center justify-center gap-2 w-full">
                                    <p className="text-xs">Password strength: </p>

                                    <div className="flex-1 h-2 bg-white/10 rounded overflow-hidden">
                                        <motion.div className="h-full rounded min-w-2" animate={{ width: barWidth, backgroundColor: strColor }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            onTapStart={() => setBtnHolding(true)}
                            onTapCancel={() => setBtnHolding(false)}
                            onTap={() => setBtnHolding(false)}
                            animate={{ 
                                scale: btnHolding ? 0.98 : 1, 
                                backgroundColor: btnHolding ? "#111111" : "#171717"
                            }}
                            className="flex items-center justify-center"
                            onClick={handleCreate}
                        >
                            {btnLoading ? <span className="spinner" /> : "Create Password"}
                        </motion.button>

                        <AnimatePresence mode="wait">
                            {error &&
                                <motion.p
                                    className="text-red-400"
                                    initial={{ opacity: 0, y: -5}}
                                    animate={{ opacity: 1, y: 0}}
                                    exit={{ opacity: 0, y: -5}}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                >
                                    {error}
                                </motion.p>
                            }
                        </AnimatePresence>

                        <MotionLink variant="later"/>
                    </div>
                </div>
            </div>
        </Interface>
        </>
    )
}