import { motion } from "motion/react"

const ModeSwitch = ({ isOn, onToggle }) => {

    // "SIGNIN"/"LOGIN" toggle switch

    return (
        <button
            onClick={onToggle}
            className="relative w-22 h-10 bg-zinc-200 rounded-xl cursor-pointer overflow-visible"
            style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.7)" }}
        >
            <motion.div className="absolute top-1 left-1 w-8 h-8 bg-orange-500 rounded-lg z-20"
                animate={{ x: isOn ? 48 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ boxShadow: "4px 4px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.5)" }} />

            <motion.div className="absolute top-1 left-1 w-8 h-8 flex items-center justify-center"
                animate={{ x: isOn ? 8 : 40 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                <span className="text-xs font-mono text-zinc-400">{isOn ? "SIGNIN" : "LOGIN"}</span>
            </motion.div>
        </button>
    )
}

export default ModeSwitch