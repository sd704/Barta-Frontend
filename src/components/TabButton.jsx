import { motion } from "motion/react"

const TabButton = ({ label, isActive, onClick }) => {
    return (
        <motion.button
            className={`px-6 py-2 font-mono text-xs tracking-widest rounded-xl ${isActive ? "text-zinc-900" : "text-zinc-500"}`}
            onClick={onClick}
            animate={{
                boxShadow: isActive
                    ? "inset 4px 4px 8px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.7)"
                    : "4px 4px 8px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.7)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {label}
        </motion.button>
    )
}

export default TabButton