import { useState } from "react"
import { motion } from "motion/react"
import { Search } from "lucide-react"

const SearchBar = ({ value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <motion.div className="relative rounded-2xl bg-zinc-200 mb-6"
            animate={{
                boxShadow: isFocused ?
                    "inset 6px 6px 12px rgba(0,0,0,0.12), inset -4px -4px 10px rgba(255,255,255,0.9)"
                    : "inset 4px 4px 8px rgba(0,0,0,0.08), inset -3px -3px 6px rgba(255,255,255,0.8)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="flex items-center gap-3 px-4 py-3">
                <Search size={16} className="text-zinc-500" />
                <input type="text" value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="SEARCH CHATS..."
                    className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-zinc-900 placeholder:text-zinc-400" />
            </div>
        </motion.div>
    )
}

export default SearchBar