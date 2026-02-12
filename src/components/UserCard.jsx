import { motion } from "motion/react"
import { UserPlus, X, UserMinus, Undo2 } from "lucide-react"

const UserCard = ({ name, handle, avatar, bio, mode, onClickPrimary, onClickSecondary }) => {

    const TactileButton = ({ onClick, variant, icon, label, }) => {
        return <motion.button
            whileTap={{ scale: 0.90 }}            
            onClick={onClick}
            className={`rounded-xl px-3 py-2.5 flex items-center gap-2 text-xs font-bold font-mono transition-all cursor-pointer
                ${variant === "primary"
                    ? "bg-orange-600 text-zinc-200 hover:bg-orange-500"
                    : "bg-zinc-300 text-zinc-900 hover:bg-[#C7C7C7]"
                }`}
            style={{ boxShadow: "3px 3px 6px #b8b8b8, -3px -3px 6px #f5f5f5" }}
        >
            {icon}
            {label && <span className="hidden sm:inline">{label}</span>}
        </motion.button>
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-zinc-200 rounded-2xl p-5 flex items-center gap-4 group"
            style={{ boxShadow: "6px 6px 12px #b8b8b8, -6px -6px 12px #f5f5f5" }}
        >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                style={{ boxShadow: "inset 3px 3px 6px #b8b8b8, inset -3px -3px 6px #f5f5f5" }}
            >
                <img src={avatar} alt={name} className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-zinc-900 text-sm truncate">{name}</h3>
                <p className="text-zinc-500 text-xs font-mono">@{handle}</p>
                <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{bio}</p>
            </div>

            <div className="flex gap-2 shrink-0">
                {mode === "DISCOVER" && (
                    <>
                        <TactileButton onClick={onClickPrimary} variant="primary" icon={<UserPlus size={16} />} label="Connect" />
                        <TactileButton onClick={onClickSecondary} variant="muted" icon={<X size={16} />} label="Ignore" />
                    </>
                )}
                {mode === "CONNECTED" && (
                    <TactileButton onClick={onClickPrimary} variant="muted" icon={<UserMinus size={16} />} label="Remove" />
                )}
                {mode === "BLOCKED" && (
                    <TactileButton onClick={onClickPrimary} variant="primary" icon={<Undo2 size={16} />} label="Unblock" />
                )}
            </div>
        </motion.div>
    )
}

export default UserCard