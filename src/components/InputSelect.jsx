import { motion } from "motion/react"

const InputSelect = ({ label, value, options, onChange, placeholder, disabled = false, accent = false }) => {
    return (
        <div className="w-full p-2">
            <label className="block text-xs font-mono tracking-widest text-zinc-500 uppercase">{label}
                <motion.div className="relative rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <select disabled={disabled} value={value} name={label} id={label} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                        className={`w-full box-border px-4 py-3 mt-2 font-mono text-sm ${accent ? "bg-zinc-300" : "bg-zinc-200"} border-none outline-none text-zinc-900 placeholder:text-zinc-400 rounded-xl ${disabled ? "appearance-none" : ""}`} >
                        {Object.keys(options).map(i => <option key={i} value={i} className="">{options[i]}</option>)}
                    </select>
                </motion.div>
            </label>
        </div>
    )
}

export default InputSelect

