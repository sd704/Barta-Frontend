import { motion, AnimatePresence } from "motion/react"

const LoadingDots = () => {
    return (
        <div className="size-full flex items-center justify-center">
            <AnimatePresence>
                <motion.div className="flex flex-col items-center"

                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <span className="text-zinc-500 font-mono tracking-widest">LOADING</span>

                    {/* Mechanical Dots */}
                    <div className="flex gap-3">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2.5 h-2.5 rounded-sm bg-orange-600"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, y: [-2, 2, -2] }} // [-2, 2, -2] for the up down animation
                                transition={{
                                    scale: { delay: i * 0.1, duration: 0.3 },
                                    y: { delay: i * 0.2, duration: 0.6, repeat: Infinity, ease: "easeInOut" },
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default LoadingDots