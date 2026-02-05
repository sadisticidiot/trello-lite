import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });
  
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="flex flex-col w-full h-auto overflow-y-auto px-6">

      <motion.div
        style={{ opacity }}
        className="
          h-52
          rounded-2xl
          bg-gradient-to-br from-indigo-500 to-pink-500
          flex items-center justify-center
          text-white text-xl font-semibold text-center
          will-change-transform
        "
      >
        I fade out as you scroll 👋
      </motion.div>
        <div className="h-50 border-2" />
        <div className="h-50 border-2" />
        <div className="h-50 border-2" />
        <div className="h-50 border-2" />
    </div>
  );
}
