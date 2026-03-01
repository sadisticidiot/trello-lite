import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "motion/react"

export default function HomePages({ pages }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const currentIndex = pages.findIndex(
    (p) => p.path === location.pathname
  )

  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <div className="flex-1 overflow-hidden">
      <motion.div
        className="flex h-full"
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        dragDirectionLock
        style={{ touchAction: "pan-y" }}
        dragConstraints={{
          left: -(pages.length - 1) * width,
          right: 0,
        }}
        animate={{ x: -safeIndex * width }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onDragEnd={(_, info) => {
          const threshold = width / 4

          if (
            info.offset.x < -threshold &&
            safeIndex < pages.length - 1
          ) {
            navigate(pages[safeIndex + 1].path)
          }

          if (
            info.offset.x > threshold &&
            safeIndex > 0
          ) {
            navigate(pages[safeIndex - 1].path)
          }
        }}
      >
        {pages.map((p) => (
          <div
            key={p.path}
            className="w-screen shrink-0 h-full flex flex-col"
          >
            <div className="flex-1 overflow-y-auto pb-12 p-2">
                {p.element}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}