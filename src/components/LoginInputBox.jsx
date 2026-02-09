import { useState } from "react"
import { motion } from "motion/react"

const LoginInputBox = ({ label, type, value, onChange, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full m-2">
            <label className="block mb-2 text-xs font-mono tracking-widest text-zinc-500 uppercase">{label}</label>
            <motion.div className="relative rounded-xl"
                animate={{
                    boxShadow: isFocused
                        ? "inset 6px 6px 12px rgba(0,0,0,0.12), inset -4px -4px 10px rgba(255,255,255,0.9)"
                        : "inset 4px 4px 8px rgba(0,0,0,0.08), inset -3px -3px 6px rgba(255,255,255,0.8)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder}
                    className="w-full px-4 py-3 font-mono text-sm bg-zinc-200 border-none outline-none text-zinc-900 placeholder:text-zinc-400 rounded-xl" />
            </motion.div>
        </div>
    )
}

export default LoginInputBox