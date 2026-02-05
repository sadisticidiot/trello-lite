import { 
    AnimatePresence,
    motion, useMotionValueEvent, 
    useScroll, useTransform 
} from "motion/react"
import { useRef, useState } from "react"
import logo from "/ewan.jfif"
import fb from "/fb-logo.png"
import discord from "/dc-logo.png"
import { Link, useNavigate } from "react-router-dom"
import { X, Menu } from "lucide-react"
import clsx from "clsx"

export default function Landing() {
    const scrollRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const { scrollY } = useScroll({
        container: scrollRef
    })

    const scale = useTransform(scrollY, [150, 545, 650, 900], [0.2, 1, 1, 0.2])
    const opacity = useTransform(scrollY, [150, 545], [0, 1])
    const headerOpacity = useTransform(scrollY, [0, 80], [1, 0.9])
    const mainDivOpacity = useTransform(scrollY, [30, 150], [1, 0])

    console.log(isOpen)

    return(
        <motion.div 
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            ref={scrollRef}
            className="relative h-screen overflow-y-auto flex 
            flex-col overscroll-contain no-scrollbar 
            px-4 bg-[url(/landing-bg.png)] bg-cover gap-5"
        >
            <div className="fixed inset-0 bg-linear-to-b 
                from-pink-500/60 via-black/90 to-black/95
                pointer-events-none"
            />

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
                                animate={{ height: "100px"}} 
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
                                    animate={{ width: "200px"}}
                                    exit={{ width: 0 }}
                                    href="https://discord.com/channels/@me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 pl-5 border-1 rounded-full flex gap-2 items-center justify-start"
                                >
                                    <img src={discord} className="h-4 w-6"/>
                                    <span>@fzxzzz</span>
                                </motion.a>
                            </motion.div>
                        }
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            <div className="flex-none h-[8rem]" />

            <motion.div 
                className="flex-none bg-pink-500 flex flex-col 
                items-center justify-center rounded p-2 z-10"
                style={{ opacity: mainDivOpacity }}
            >
                <h1>Talaan</h1>
                <span>basta description 'yan</span>
            </motion.div>

            <motion.div 
                className="flex-none flex items-center justify-center 
                bg-neutral-900 p-4 rounded h-[20rem] border-2 z-10"
            >
                Hi
            </motion.div>

            <div className="flex-none h-[150vh] border-2 border-pink-600 z-10" />
         </motion.div>
    )
}