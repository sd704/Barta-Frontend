import { Icon } from 'lucide-react';
import { motion } from "motion/react"

const ListGridButton = ({ icon: Icon, label, isActive, onClick }) => {

    const activeShadow = "inset 4px 4px 8px #c5c5c8, inset -4px -4px 8px #ffffff"
    const inactiveShadow = "6px 6px 12px #c5c5c8, -6px -6px 12px #ffffff"
    const tapShadow = "inset 2px 2px 4px #c5c5c8, inset -2px -2px 4px #ffffff"

    return (
        <motion.button
            onClick={onClick}
            animate={{
                boxShadow: isActive ? activeShadow : inactiveShadow,
                color: isActive ? "#18181b" : "#71717a",
            }}
            whileTap={!isActive ? { boxShadow: tapShadow } : undefined}
            transition={{ duration: 0.2, ease: "easeInOut", }}
            className="px-6 py-3 rounded-xl font-mono text-sm uppercase tracking-wider flex items-center gap-2 bg-zinc-200 cursor-pointer"
        >
            <Icon size={16} />
            {label}
        </motion.button>
    )
}

export default ListGridButton