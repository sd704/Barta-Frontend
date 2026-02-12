import { motion } from "motion/react"

const TabButtonAccent = ({ label, count, isActive, onClick }) => {

    // "DISCOVER", "CONNECTED", "BLOCKED" on Connections Page

    return (
        <motion.button
            className={`px-5 py-3 font-mono font-bold text-xs tracking-widest rounded-xl cursor-pointer 
                ${isActive ? "text-zinc-200 bg-orange-600" : "text-zinc-500 bg-zinc-200 hover:text-zinc-900"}`}
            style={{ boxShadow: "3px 3px 6px #b8b8b8, -3px -3px 6px #f5f5f5" }}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {label}
            <span className={`ml-2 ${isActive ? "text-zinc-200" : "text-zinc-500"}`}>
                {count}
            </span>
        </motion.button>
    )
}

export default TabButtonAccent