import { motion } from "motion/react"

const SubmitButton = ({ children, onClick }) => {

    // Login page Submit Button

    return (
        <motion.button
            className={`relative px-8 py-3 w-full font-mono text-sm tracking-wider overflow-hidden rounded-xl bg-zinc-900 text-zinc-100 cursor-pointer hover:bg-zinc-800`}
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)" }}>
            {children}
        </motion.button>
    )
}

export default SubmitButton