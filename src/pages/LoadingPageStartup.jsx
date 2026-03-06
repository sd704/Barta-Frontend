import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"

const loadingSteps = ["INIT_SYSTEM", "LOAD_MODULES", "SYNC_DATA", "RENDER_UI", "READY"]

const LoadingPageStartup = () => {

    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [loading, setLoading] = useState(true)

    // Progress is mapped to steps, E.g. 37 / 20 = 1.85, floor → 1, Step arr[1]
    const currentStep = Math.min(Math.floor(progress / 20), loadingSteps.length - 1)

    useEffect(() => {
        const interval = setInterval(() => {

            // Why we calculate progress inside setProgress?
            // The progress variable inside setInterval will always be the value from the first render
            // const next = progress (will always be 0) + random; setProgress(next);

            setProgress((prev) => {
                // Increase progress by random number between (0 to 8) + 2 -> 2 and 10
                // To make loading look natural instead of linear
                // Math.min ensures progress value never goes past 100
                const next = Math.min(prev + Math.random() * 8 + 2, 100)

                // When progress reaches 100
                if (next >= 100) {
                    clearInterval(interval) // Stop the interval
                    setTimeout(() => setIsComplete(true), 400) // isComplete = true triggers exit animation after 400ms
                    setTimeout(() => setLoading(false), 1200) // To switch page after 1200ms
                }

                return next // Return updated progress value
            })
        }, 120) // Every 120ms -> Update Progress
        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}>

                    <div className="flex flex-col items-center gap-10 px-6">

                        {/* Logo / Brand Mark */}
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative">
                            <div className="bg-zinc-200 w-24 h-24 rounded-2xl flex items-center justify-center"
                                style={{ boxShadow: "6px 6px 12px #BFC4CF, -6px -6px 12px #F2F3F7" }}>
                                <motion.div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center"
                                    animate={{ rotate: [0, 90, 90, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                                    <span className="text-zinc-200 text-2xl font-bold tracking-tighter">XX</span>
                                </motion.div>
                            </div>
                            {/* Status LED */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-600"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* Progress Bar - Neumorphic */}
                        <div className="w-64">
                            <div className="rounded-full h-3 overflow-hidden p-0.5"
                                style={{ boxShadow: "inset 4px 4px 8px #BFC4CF, inset -4px -4px 8px #F2F3F7" }}>
                                <motion.div
                                    className="h-full rounded-full bg-orange-600"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "easeOut", duration: 0.15 }}
                                />
                            </div>
                            <div className="flex justify-between mt-3">
                                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{loadingSteps[currentStep]}</span>
                                <span className="text-[10px] text-zinc-500 font-mono tabular-nums">{Math.round(progress)}%</span>
                            </div>
                        </div>


                        {/* Mechanical Dots */}
                        <div className="flex gap-3">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className={`w-2.5 h-2.5 rounded-sm ${i <= currentStep ? "bg-orange-600" : "bg-zinc-300"}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, y: i === currentStep ? [-2, 2, -2] : 0, }} // [-2, 2, -2] for the up down animation
                                    transition={{
                                        scale: { delay: i * 0.1, duration: 0.3 },
                                        y: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                />
                            ))}
                        </div>

                        {/* Terminal-style text */}
                        <motion.div
                            className="rounded-lg px-4 py-3 bg-zinc-200 max-w-xs w-full"
                            style={{ boxShadow: "3px 3px 6px #BFC4CF, -3px -3px 6px #F2F3F7" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-red-600" />
                                <div className="w-2 h-2 rounded-full bg-orange-600" />
                                <div className="w-2 h-2 rounded-full bg-zinc-500" />
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 space-y-1">
                                {loadingSteps.slice(0, currentStep + 1).map((step, i) => (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-2"
                                    >
                                        <span className="text-orange-600">›</span>
                                        <span>{step.toLowerCase().replace("_", ".")}</span>
                                        {i < currentStep && (<span className="text-orange-600 ml-auto">✓</span>)}
                                        {i === currentStep && (
                                            <motion.span
                                                className="ml-auto"
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >_</motion.span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingPageStartup