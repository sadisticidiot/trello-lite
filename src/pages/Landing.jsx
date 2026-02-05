import { 
    AnimatePresence,
    motion, useMotionValueEvent, 
    useScroll, useTransform 
} from "motion/react"
import { useRef, useState } from "react"
import logo from "/ewan.jfif"
import { Link, useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"

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
                    className="rounded shadow-xl/30 rounded-full 
                    p-5 fixed top-4 w-9/10 flex justify-between
                    items-center bg-neutral-950 z-20 backdrop-blur-[1px]"
                    style={{ opacity: headerOpacity }}
                    initial={{ y: -150 }}
                    animate={{ y: 0 }}
                    exit={{ y: -150 }}
                >
                    <div className="flex items-center justify-center gap-3">
                        <Link to='/'>
                            <img 
                                src={logo} 
                                className="border-r-0 border-white/80 
                                border-2 size-10 rounded-full"
                            />
                        </Link>
                        <h1 className="text-pink-500">Talaan</h1>
                    </div>
                    <button 
                        className="flex items-center justify-center w-auto border-0"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="size-7"/>
                    </button>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {isOpen && 
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}  
                            className="absolute inset-0 backdrop-blur-[2px] bg-black/40 z-30" 
                        />

                        <motion.div
                            className="fixed right-0 h-full bg-neutral-950 z-40 shadow-xl/30"
                            initial={{ width: "0vw" }}
                            animate={{ width: "40vw" }}
                            exit={{ width: "0vw" }}
                        >

                        </motion.div>   
                    </> 
                }
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