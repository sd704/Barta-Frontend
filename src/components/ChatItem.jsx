import { motion } from "motion/react"
import { User } from "lucide-react"

const ChatItem = ({ userData, name, message, time, unread, isOnline, onClick }) => {

    const avatar = userData.pfp
    const variants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

    return (
        <motion.div
            variants={variants}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)" }}
            className="relative p-4 bg-zinc-200 rounded-2xl cursor-pointer mb-3 group"
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >

            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className={`w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center overflow-hidden ${avatar ? "" : "text-orange-600"}`}
                        style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.7)" }}>
                        {avatar && <img src={avatar} alt={name} className="w-full h-full object-cover" />}
                        {!avatar && <User />}
                    </div>
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"
                            style={{ boxShadow: "0 0 8px rgba(34,197,94,0.6), 2px 2px 4px rgba(0,0,0,0.2)" }} />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-mono text-sm tracking-wider text-zinc-900 group-hover:text-orange-600 truncate">{name}</h3>
                        <span className="text-xs font-mono text-zinc-500 ml-2">{time}</span>
                    </div>
                    <p className="text-xs font-mono text-zinc-500 truncate">{message}</p>
                </div>

                {/* Unread Badge */}
                {typeof unread !== 'undefined' && unread > 0 && (<div className="shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center"
                    style={{ boxShadow: "3px 3px 6px rgba(255,100,0,0.4), -2px -2px 4px rgba(255,150,50,0.3)" }}>
                    <span className="text-xs font-mono text-white">{unread}</span>
                </div>)}
            </div>
        </motion.div>
    )
}

export default ChatItem