import { motion } from "motion/react"

export default function ConfPopup({ children, closeConf }) {

  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="overlay backdrop-blur-[2px]" 
        onClick={() => closeConf(false)} 
      />

      <motion.div
        key="popup"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="confirmation-base"
      >
        {children}
      </motion.div>
              
    </div>
    )
}