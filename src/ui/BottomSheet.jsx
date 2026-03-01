import { 
    motion, animate, 
    useMotionValue, useTransform, 
    useSpring
} from "motion/react"
import { useEffect } from "react"
import { useNotesLogic } from "../logic/NotesLogic"

const RESTING_Y = 80
const CLOSE_TRESHOLD = 210

export default function BottomSheet({ children }) {
  const { attemptClose } = useNotesLogic()

  const y = useMotionValue(window.innerHeight)
  const smoothY = useSpring(y, {stiffness: 200, damping: 30})
  const overlayOpacity = useTransform(smoothY, [230, 600], [1, 0])
  const overlayBlur = useTransform(smoothY, [230, 600], ["blur(4px)", "blur(0px)"])
  
  useEffect(() => {
    animate(y, RESTING_Y, {
        type: "spring",
        stiffness: 300,
        damping: 30,
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
        document.body.style.overflow = ""
    }
  }, [])

  const handleExit = async () => {
    const shouldClose = await attemptClose()
    if (!shouldClose) return

    const controls = animate(y, window.innerHeight, {
      type: "spring",
      stiffness: 300,
      damping: 30
    })
    await controls.finished
  }

  return(
    <div className="flex pt-5 fixed inset-0 z-40">
      <motion.div 
        className="overlay touch-none z-30" 
        style={{ 
          opacity: overlayOpacity, 
          backdropFilter: overlayBlur,
          WebkitBackdropFilter: overlayBlur
        }} 
        onClick={handleExit}
      />

      <motion.div 
        className="w-dvw h-full bg-white z-40 rounded-t-[20px] gap-2
        pt-1 flex flex-col items-center p-2 px-3"
        style={{ y }}
        drag="y"
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{ bottom: 450, top: 10 }}
        onDragEnd={(_, info) => {
          const currentY = y.get()
          const distanceFromRest = currentY - RESTING_Y

          if (distanceFromRest > CLOSE_TRESHOLD || info.velocity.y > 800) {
            handleExit()
          } else if (distanceFromRest > 150) {
            animate(y, 230, {
              type: "spring",
              stiffness: 300,
              damping: 30,
            })
          } else if (distanceFromRest < 10) {
            animate(y, 10, {
              type: "spring",
              stiffness: 300,
              damping: 30,
            })
          } else {
            animate(y, RESTING_Y, {
              type: "spring",
              stiffness: 300,
              damping: 30,
            })
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}