import { 
    motion, useMotionValueEvent, 
    useScroll, useTransform 
} from "motion/react"
import { useRef } from "react"

export default function Landing() {
    const scrollRef = useRef(null)

    const { scrollY } = useScroll({
        container: scrollRef
    })

    const scale = useTransform(scrollY, [150, 545, 650, 900], [0.2, 1, 1, 0.2])
    const opacity = useTransform(scrollY, [150, 545], [0, 1])

    return(
        <div 
            ref={scrollRef}
            className="h-screen overflow-y-auto 
            overscroll-contain no-scrollbar p-4"
        >
            <div className="h-[120vh]" />

            <motion.div 
                className="flex items-center justify-center 
                bg-neutral-900 p-4 rounded h-[20rem]"
                style={{ scale, opacity }}
            >
                Hi
            </motion.div>

            <div className="h-[100vh]" />
         </div>
    )
}