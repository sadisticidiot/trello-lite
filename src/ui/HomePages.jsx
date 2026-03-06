import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import {  animate, motion, useMotionValue } from "motion/react"
import { useNotesLogic } from "../logic/NotesLogic"
import clsx from "clsx"

export default function HomePages({ pages }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { playAnim } = useNotesLogic()
  const { isFooter } = useOutletContext()

  const x = useMotionValue(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const currentIndex = pages.findIndex(p => p.path === location.pathname)
  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  useEffect(() => {  
    const width = containerRef.current?.offsetWidth || window.innerWidth
    if (!playAnim && location.pathname !== '/') {
      x.set(-width)
      return
    }

    animate(x, -safeIndex * width, {
        type: "spring",
        stiffness: 300,
        damping: 30,
    })
  }, [safeIndex, location.pathname])
  
  return (
    <div 
      ref={containerRef} 
      className="flex-1 overflow-hidden block md:hidden touch-pan-x"
    >
      <motion.div
        className="flex h-full"
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        dragDirectionLock
        dragPropagation
        style={{ x }}
        dragConstraints={containerRef}
        onDragEnd={(_, info) => {
          const width = containerRef.current?.offsetWidth || window.innerWidth
          let nextIndex = safeIndex
          const movedFarEnough = Math.abs(info.offset.x) > width / 2
          const movedFastEnough = Math.abs(info.velocity.x) > width

          if (movedFarEnough || movedFastEnough) {
            if (info.offset.x < 0) {
              nextIndex = safeIndex + 1
            } else {
              nextIndex = safeIndex - 1
            }
          }

          nextIndex = Math.max(0, Math.min(pages.length - 1, nextIndex))

          animate(x, -nextIndex * width, {
            type: "spring",
            stiffness: 300,
            damping: 30,
          })

          navigate(pages[nextIndex].path)
        }}
      >
        {pages.map((p) => (
          <div
            key={p.path}
            className="w-screen shrink-0 h-full flex flex-col"
          >
            <div className={clsx("flex-1 overflow-y-auto p-2", isFooter ? "pb-11" : "pb-2")}>
                {p.element}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}