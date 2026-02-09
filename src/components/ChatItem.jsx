import { useState } from "react"
import { motion } from "motion/react"

const ChatItem = ({ name, message, time, unread, isOnline, avatar, onClick }) => {
    const [isPressed, setIsPressed] = useState(false)

    return (
        <motion.div onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)} onMouseLeave={() => setIsPressed(false)} onClick={onClick}
            animate={{ scale: isPressed ? 0.98 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)" }}
            className="relative p-4 bg-zinc-200 rounded-2xl cursor-pointer mb-3"
        >
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://www.fomostore.in/cdn/shop/files/BISTAM375_1_819d72f0-fb42-459e-8eec-2d70e9888a19.jpg')]"
                        style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.7)" }}>
                        {/* <div className="text-lg font-mono text-zinc-600">{avatar}</div> */}
                    </div>
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"
                            style={{ boxShadow: "0 0 8px rgba(34,197,94,0.6), 2px 2px 4px rgba(0,0,0,0.2)" }} />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-mono text-sm tracking-wider text-zinc-900 truncate">{name}</h3>
                        <span className="text-xs font-mono text-zinc-500 ml-2">{time}</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 truncate">{message}</p>
                </div>

                {/* Unread Badge */}
                {typeof unread !== 'undefined' && unread > 0 && (<div className="shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                    style={{ boxShadow: "3px 3px 6px rgba(255,100,0,0.4), -2px -2px 4px rgba(255,150,50,0.3)" }}>
                    <span className="text-xs font-mono text-white">{unread}</span>
                </div>)}
            </div>
        </motion.div>
    )
}

export default ChatItem