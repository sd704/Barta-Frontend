import { motion } from 'motion/react'

const NotFound = () => {
    return (
        <div className="size-full flex items-center justify-center overflow-hidden relative">

            <div className="relative z-10 flex flex-col items-center gap-12 px-6">

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
                    {/* Neumorphic container */}
                    <div className="bg-zinc-200 rounded-3xl px-16 py-12 relative"
                        style={{ boxShadow: "12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.8)" }}>

                        {/* Corner Details - Neumorphic dots */}
                        <div className="absolute top-4 left-4 w-3 h-3 bg-zinc-200 rounded-full"
                            style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                        <div className="absolute top-4 right-4 w-3 h-3 bg-zinc-200 rounded-full"
                            style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                        <div className="absolute bottom-4 left-4 w-3 h-3 bg-zinc-200 rounded-full"
                            style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                        <div className="absolute bottom-4 right-4 w-3 h-3 bg-zinc-200 rounded-full"
                            style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />

                        {/* 404 Display */}
                        <div className="flex items-center gap-6">
                            <div className="font-mono text-[120px] leading-none tracking-tighter text-[#2d2d2d] select-none font-bold"
                                style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.9)" }}>4</div>
                            <div className="font-mono text-[120px] leading-none tracking-tighter text-orange-600 select-none font-bold"
                                style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.9)" }}>0</div>
                            <div className="font-mono text-[120px] leading-none tracking-tighter text-[#2d2d2d] select-none font-bold"
                                style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.2), -2px -2px 6px rgba(255,255,255,0.9)" }}>4</div>
                        </div>

                        {/* Status indicator */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-200 px-6 py-2 rounded-xl shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff]">
                            <span className="font-mono text-xs tracking-wider text-[#666] uppercase">Page Not Found</span>
                        </div>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center max-w-md">
                    <p className="font-mono text-sm text-[#666] leading-relaxed tracking-wide">
                        The content you're looking for has drifted into the void.
                        It might have been deleted, moved, or never existed.
                    </p>
                </motion.div>

                {/* Error code - minimalist detail */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
                    className="font-mono text-[10px] text-[#999] tracking-widest uppercase">
                    ERR_404_SOCIAL_MEDIA_APP
                </motion.div>
            </div>

            {/* Ambient floating elements */}
            <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-zinc-200 shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff] opacity-40"
            />

            <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-zinc-200 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] opacity-40"
            />

        </div>
    )
}

export default NotFound