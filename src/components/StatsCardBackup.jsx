import { motion, useMotionValue, useTransform, animate } from "motion/react"
import { useEffect } from 'react'

// THIS CODE IS FOR ANIMATING NUMBER FROM 0 TO NUMBER WITHOUT THE SCROLL ANIMATION

const StatsCard = ({ label, value }) => {

    const number = parseInt(value)
    const count = useMotionValue(0) // updates without re-rendering React

    // useTransform() -> Creates a derived motion value. It transforms one motion value into another.
    const formatted = useTransform(count, (latest) => {
        if (latest >= 1_000_000_000) {
            return (latest / 1_000_000_000).toFixed(1) + 'B';
        } else if (latest >= 1_000_000) {
            return (latest / 1_000_000).toFixed(1) + 'M';
        } else if (latest >= 1_000) {
            return (latest / 1_000).toFixed(1) + 'K';
        }
        return Math.round(latest).toLocaleString();
    })

    useEffect(() => {
        // animate() -> Animates a value from one number to another over time.
        const controls = animate(count, number, { duration: 1, ease: 'easeOut' });
        return controls.stop;
    }, [count, number]);

    return (
        <motion.div
            className="bg-zinc-200 rounded-2xl p-6"
            style={{ boxShadow: "8px 8px 16px rgba(197,197,200,0.5), -8px -8px 16px rgba(255,255,255,0.8)" }}
            whileHover={{ y: -2, boxShadow: '12px 12px 24px rgba(197,197,200,0.6), -12px -12px 24px rgba(255,255,255,0.9)' }}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <div className="text-[#71717a] text-sm uppercase tracking-wider mb-2 font-mono">
                {label}
            </div>
            <motion.div className="text-[#18181b] text-3xl font-mono"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}>
                {formatted}
            </motion.div>
        </motion.div>
    )
}

export default StatsCard