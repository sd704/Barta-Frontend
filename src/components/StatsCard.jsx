import { motion } from "motion/react"
import RollingDigit from './RollingDigit.jsx'

const StatsCard = ({ label, value }) => {

    const number = parseInt(value) || 0

    const formatted = (number) => {
        if (number >= 1_000_000_000_000) return (number / 1_000_000_000_000).toFixed(1) + "T"
        if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1) + "B"
        if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M"
        if (number >= 1_000) return (number / 1_000).toFixed(1) + "K"
        return Math.round(number).toLocaleString("en-US")
    }

    return (
        <motion.div
            className="bg-zinc-200 rounded-2xl p-6"
            style={{ boxShadow: "8px 8px 16px rgba(197,197,200,0.5), -8px -8px 16px rgba(255,255,255,0.8)" }}
            whileHover={{ y: -2, boxShadow: '12px 12px 24px rgba(197,197,200,0.6), -12px -12px 24px rgba(255,255,255,0.9)' }}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <div className="text-zinc-500 text-sm uppercase tracking-wider mb-2 font-mono">
                {label}
            </div>
            <motion.div className="text-zinc-900 text-3xl font-mono flex ">
                {formatted(number).split("").map((char, index) => {

                    // If number → roll
                    if (!isNaN(char) && char !== " ") {
                        return <RollingDigit key={index} digit={parseInt(char)} index={index} />
                    }

                    // If ".", ",", "K/M/B"
                    return <div key={index} className="h-8">{char}</div>
                })}
            </motion.div>
        </motion.div>
    )
}

export default StatsCard