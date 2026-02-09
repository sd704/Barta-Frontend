import { motion } from "motion/react"
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react"

const ChatHeader = ({ name, status, isOnline, avatar, onBack }) => {
    return (
        <div className="bg-zinc-200 p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">

                    {/* Back Button */}
                    <motion.button className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center shrink-0"
                        whileTap={{ scale: 0.95 }} onClick={onBack} style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)" }}>
                        <ArrowLeft size={20} className="text-zinc-700" />
                    </motion.button>

                    {/* Avatar and Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative shrink-0">

                            {/* Avatar */}
                            <div className="w-11 h-11 bg-zinc-200 rounded-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-[url('https://www.fomostore.in/cdn/shop/files/BISTAM375_1_819d72f0-fb42-459e-8eec-2d70e9888a19.jpg')]"
                                style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.7)" }}>
                                {/* <div className="text-sm font-mono text-zinc-600">{avatar}</div> */}
                            </div>

                            {/* Online Green Dot */}
                            {isOnline && (<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"
                                style={{ boxShadow: "0 0 8px rgba(34,197,94,0.6), 2px 2px 4px rgba(0,0,0,0.2)" }} />
                            )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0">
                            <h2 className="font-mono text-sm tracking-wider text-zinc-900 truncate">{name}</h2>
                            <p className="text-xs font-mono text-zinc-500">{status}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">

                    <motion.button className="w-9 h-9 bg-zinc-200 rounded-xl flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                        style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.7)" }}>
                        <Phone size={16} className="text-zinc-700" />
                    </motion.button>

                    <motion.button className="w-9 h-9 bg-zinc-200 rounded-xl flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                        style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.7)" }}>
                        <Video size={16} className="text-zinc-700" />
                    </motion.button>

                    <motion.button className="w-9 h-9 bg-zinc-200 rounded-xl flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                        style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.7)" }}>
                        <MoreVertical size={16} className="text-zinc-700" />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader