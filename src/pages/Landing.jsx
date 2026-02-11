import { 
    AnimatePresence, motion,
    useMotionValueEvent,
    useScroll, useSpring, useTransform, 
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import logo from "/ewan.jfif"
import pint from "/pinterest-logo.png"
import discord from "/dc-logo.png"
import { Link, useNavigate } from "react-router-dom"
import { X, Menu } from "lucide-react"
import { useAuth } from "../AuthProvider"
import MotionLink from "../ui/MotionLink"

export default function Landing() {
    const { session } = useAuth()
    const navigate = useNavigate()
    const scrollRef = useRef(null)
    const nextSectionRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

    const { scrollYProgress } = useScroll({ container: scrollRef })

    const mainDivOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const firstChildOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])

    useEffect(() => {
        if (!session) return
        navigate("/auth-intermission", { replace: true })
    }, [session, navigate])

    return(
        <div
            className="w-screen h-screen relative
            bg-black flex overflow-y-auto p-4"
            ref={scrollRef}
        >
            <div className="flex flex-col size-full">
                <div className="pointer-events-none absolute bg-gradient-to-b 
                from-pink-600/30 via-pink-600/10 to-transparent inset-0" />

                {/* Header */}
                <motion.div 
                    className="fixed bg-neutral-950/95 top-4 right-6 p-4 rounded-full z-50
                    flex flex-col max-h-screen w-9/10 md:left-15 shadow-[0_0_20px_rgba(0,0,0,0.5)]
                    backdrop-blur-sm"
                    initial={{ 
                        y: -150, 
                        borderRadius: "50px",
                        opacity: 1
                    }}
                    animate={{ 
                        y: 0, 
                        borderRadius: isOpen ? "20px" : "50px",
                        opacity: isOpen ? 0.95 : 1
                    }}
                    exit={{
                        y: -150,
                        borderRadius: "50px",
                        opacity: 1
                    }}
                >
                    <div className="flex justify-between items-center">
                        {/* Header's left side */}
                        <div className="flex gap-5 items-center">
                            <Link to="/">
                                <img src={logo} className="rounded-full size-12" />
                            </Link>

                            <Link to="/">
                                <h2 className="font-bold text-[20px]">
                                    <span className="text-pink-600 text-[30px]">
                                        T
                                    </span>
                                    alaan
                                </h2>
                            </Link>
                        </div>

                        {/* Header's right side */}
                        <button 
                            className="block md:hidden p-0 border-0 w-auto"
                            onClick={() => setIsOpen(p => !p)}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="size-7 text-pink-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="size-7 text-pink-500"/>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* Header's right side for desktop */}
                        <div className="gap-6 items-center hidden md:flex">
                            <a href="https://www.pinterest.com/sond1aaaaa/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={pint} className="size-8"/>
                            </a>

                            <a href="https://www.discord.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={discord} className="h-6 w-8"/>
                            </a>

                            <motion.div 
                                className="bg-pink-800/50 border-2 border-pink-500 
                                    rounded-full p-2"
                                whileHover={{ 
                                    boxShadow: "0px 0px 20px rgba(230, 0, 119, 0.58)" 
                                }}
                            >
                                <Link to='/signin' className="px-10 p-2 font-semibold">
                                    Sign in
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Header's extra content */}
                    {isOpen && 
                        <div
                            className="flex flex-col gap-2"
                        >
                            <div className="p-2" />

                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-white/80"
                            >
                                Contact me:
                            </motion.span>

                            <motion.a 
                                initial={{ width: 0 }}
                                animate={{ width: "290px"}}
                                exit={{ width: 0 }}
                                href="https://discord.com/channels/@me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 pl-5 border-1 rounded-full flex gap-2 
                                items-center justify-start"
                            >
                                <img src={discord} className="w-6 h-5"/>
                                <span>@fzxzzz</span>
                            </motion.a>

                            <motion.a 
                                initial={{ width: 0 }}
                                animate={{ width: "290px"}}
                                exit={{ width: 0 }}
                                href="https://www.pinterest.com/sond1aaaaa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 pl-5 border-1 rounded-full flex 
                                gap-2 items-center justify-start"
                            >
                                <img src={pint} className="size-5"/>
                                <span>sond1aaaaa</span>
                            </motion.a>
                        </div>
                    }

                </motion.div>

                <motion.div 
                    style={{ opacity: mainDivOpacity }}
                    className="h-[100vh] items-center
                    flex justify-center flex-col gap-4 flex-none">
                    <h1 className="text-shadow-lg/30 text-[3rem] md:text-[4rem]">
                        A calmer way<br />
                        to organize your life
                    </h1>
                    <span className="font-semibold text-center text-shadow-lg/30">
                        Turn chaos into clarity with notes, quests,
                        and reminders. Stay on track, beat procrastination,
                        and shape a workspace that fits you.
                    </span>
                    <div className="flex gap-4">
                        <Link 
                            to="/signup"
                            className="bg-pink-700/30 ring-2 ring-pink-400/60
                            p-2 px-6 rounded-xl shadow-xl/10 shadow-pink-300"
                        >
                            Sign up now
                        </Link>

                        <button 
                            className="bg-neutral-700/30 ring-2 ring-neutral-400/60
                            p-2 px-4 rounded-xl shadow-xl/10 shadow-white"
                            onClick={() => nextSectionRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            })}
                        >
                                Learn more
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    style={{ opacity: firstChildOpacity }}
                    className="h-[100vh] flex-none flex p-4 pb-6 pt-30"
                    ref={nextSectionRef}
                >
                    <div className="ring-2 ring-pink-400/60 size-full
                    shadow-[0_0_20px_rgba(253,165,213,0.3)] rounded-lg
                    flex flex-col gap-4 justify-center items-center">
                        <span className="text-white/40">Work in progress</span>
                        <span className="spinner border-white/40 border-l-transparent" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}