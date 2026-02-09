import { useState } from "react"
import { motion } from "motion/react"

const SubmitButton = ({ children, onClick, variant = "primary" }) => {

    const [isPressed, setIsPressed] = useState(false);
    const isPrimary = variant === "primary";

    return (
        <motion.button
            className={`relative px-8 py-3 w-full font-mono text-sm tracking-wider overflow-hidden rounded-xl ${isPrimary ? "bg-zinc-900 text-zinc-100" : "bg-zinc-200 text-zinc-900"}`}
            onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)} onMouseLeave={() => setIsPressed(false)} onClick={onClick}
            animate={{scale: isPressed ? 0.95 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
                boxShadow: "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)"
                // boxShadow: isPressed
                //     ? isPrimary
                //         ? "inset 4px 4px 10px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(50,50,50,0.5)" : "inset 6px 6px 12px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.7)"
                //     : isPrimary
                //         ? "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)" : "8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,255,255,0.5)"
            }}
        >
            {children}
        </motion.button>
    )
}

export default SubmitButton