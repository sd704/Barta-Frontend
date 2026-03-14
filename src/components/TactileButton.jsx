import { motion } from "motion/react"

const TactileButton = ({ onClick, variant, icon, label, }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.90 }}
            onClick={onClick}
            className={`rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs font-bold font-mono cursor-pointer
                ${variant === "primary"
                    ? "bg-orange-600 text-zinc-200 hover:bg-orange-500"
                    : "bg-zinc-300 text-zinc-900 hover:bg-[#C7C7C7]"
                }`}
            style={{ boxShadow: "3px 3px 6px #b8b8b8, -3px -3px 6px #f5f5f5" }}
        >
            {icon}
            {label && <span className="hidden sm:inline">{label}</span>}
        </motion.button>
    )
}

export default TactileButton