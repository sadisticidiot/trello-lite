import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react"

export default function FullScreen() {
    const location = useLocation()

    return (
        <div className="w-dvw h-dvh">
            <AnimatePresence mode="wait">
                <motion.div className="size-full"
                key={location.pathname}
                initial={{ scale: 0.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.2, opacity: 0.5 }}>
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}