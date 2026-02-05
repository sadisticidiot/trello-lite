import { 
    AnimatePresence,
    motion, useMotionValueEvent, 
    useScroll, useSpring, useTransform, 
    useVelocity
} from "motion/react"
import { useRef, useState } from "react"
import logo from "/ewan.jfif"
import pint from "/pinterest-logo.png"
import discord from "/dc-logo.png"
import { Link, useNavigate } from "react-router-dom"
import { X, Menu } from "lucide-react"
import clsx from "clsx"

export default function Landing() {
    const scrollRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const { scrollY } = useScroll({ container: scrollRef })
    const velocity = useVelocity(scrollY)

    const smoothScrollY = useSpring(scrollY, {
        stiffness: 120,
        damping: 30,
        mass: 0.8
    })

    const scale = useTransform(smoothScrollY, [140, 300], [1, 0.6])
    const headerOpacity = useTransform(smoothScrollY, [0, 80], [1, 0.9])
    const mainDivOpacity = useTransform(smoothScrollY, [140, 230], [1, 0])

    return(
        <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            ref={scrollRef}
            className="relative h-screen overflow-y-auto
            overscroll-contain no-scrollbar
            bg-[url(/landing-bg.png)] bg-cover"
        >
            <div className="absolute w-full h-[600vh] bg-gradient-to-b 
                from-pink-500/60 from-0.1% via-black/90 via-20% to-black/95
                to-90% pointer-events-none"
            />

            <div className="flex flex-col gap-5 px-4">
                <AnimatePresence mode="wait">
                    <motion.div 
                        className="rounded shadow-xl/30 p-5 fixed
                        top-4 w-9/10 flex flex-col justify-center max-h-900
                        bg-neutral-950 z-20 backdrop-blur-[1px] overflow-hidden"
                        style={{ opacity: headerOpacity }}
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
                            <div className="flex items-center justify-center gap-3">
                                <Link to='/'>
                                    <img 
                                        src={logo} 
                                        className="border-r-0 border-white/80 
                                        border-2 size-10 rounded-full"
                                    />
                                </Link>
                                <h1 className="flex items-center justify-center font-normal p-0"><span className="font-bold text-pink-500 text-[32px]">T</span>alaan</h1>
                            </div>
                            <button 
                                className="flex items-center justify-center w-auto border-0"
                                onClick={() => setIsOpen(p => !p)}
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        >
                                            <X className="size-7 text-pink-500" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        >
                                            <Menu className="size-7 text-pink-500"/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                        </div>

                        <AnimatePresence>
                            {isOpen && 
                                <motion.div 
                                    initial={{ height: 0}} 
                                    animate={{ height: "150px"}} 
                                    exit={{ height: 0}}
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
                                        className="p-2 pl-5 border-1 rounded-full flex gap-2 items-center justify-start"
                                    >
                                        <img src={discord} className="h-4 w-6"/>
                                        <span>@fzxzzz</span>
                                    </motion.a>

                                    <motion.a 
                                        initial={{ width: 0 }}
                                        animate={{ width: "290px"}}
                                        exit={{ width: 0 }}
                                        href="https://pin.it/4FX7nJRIm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 pl-5 border-1 rounded-full flex gap-2 items-center justify-start"
                                    >
                                        <img src={pint} className="size-5"/>
                                        <span>sond1aaaaa</span>
                                    </motion.a>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>

                <motion.div 
                    className="flex-none flex flex-col h-[100vh]
                    items-center justify-center rounded p-2 z-10"
                    style={{ opacity: mainDivOpacity, scale }}
                >
                    <h1 className="py-0 text-[3rem]/13">insert maangas na one liner here</h1>
                    <span className="text-center text-[14px]">  
                        basta description 'yan tapos kelangan mahaba
                        para malaki yung space na inoocuppy para may
                        laman naman  yung opening div kahit papano
                        like siguro ganito yung minimum height
                    </span>

                    <div className="flex w-full gap-2 mt-4"> 
                        <Link className="link-base w-6/10" to='/signin'>Sign in</Link>
                        <Link className="ring-2 ring-white/40 rounded-xl shadow-xl/30 shadow-white/40 flex-1 text-center bg-neutral-500/20 p-2" to='/signup'>Sign up</Link>
                    </div>
                </motion.div>

                <div className="flex-none h-[40vh]" />

                <motion.div 
                    className="flex-none flex items-center justify-center 
                    bg-neutral-900 p-4 rounded h-[20rem] border-2 z-10"
                >
                    Hi
                </motion.div>

                <div className="flex-none h-[150vh] border-2 border-pink-600 z-10" />
            </div>
         </motion.div>
    )
}