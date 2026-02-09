import { motion } from "motion/react"

const MessageBubble = ({ text, time, isSent, isRead }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4`}    >
            <div className={`max-w-[75%] ${isSent ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl w-fit max-w-full ${isSent ? "bg-zinc-900 rounded-br-none" : "bg-zinc-200 rounded-bl-none"}`}
                    style={{
                        boxShadow: isSent
                            ? "6px 6px 12px rgba(0,0,0,0.3), -3px -3px 8px rgba(40,40,40,0.2)"
                            : "8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)"
                    }}
                >
                    <p className={`font-mono text-sm wrap-break-word min-w-0 ${isSent ? "text-zinc-100" : "text-zinc-900"}`}>{text}</p>
                </div>
                <div className="flex items-center gap-2 px-2">
                    <span className="text-xs font-mono text-zinc-500">{time}</span>
                    {isSent && (
                        <div className="flex gap-0.5">
                            <div className={`w-1 h-1 rounded-full ${isRead ? "bg-green-500" : "bg-zinc-400"}`}
                                style={{ boxShadow: isRead ? "0 0 4px rgba(34,197,94,0.6)" : "none" }} />
                            <div className={`w-1 h-1 rounded-full ${isRead ? "bg-green-500" : "bg-zinc-400"}`}
                                style={{ boxShadow: isRead ? "0 0 4px rgba(34,197,94,0.6)" : "none" }} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default MessageBubble