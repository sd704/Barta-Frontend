import { motion } from "motion/react"
import { User, X } from 'lucide-react'

const Toast = ({ showPfp = true, hasPfp = false, pfp, text, onClose, addCloseBtn }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], }}
            style={{ boxShadow: "6px 6px 12px #b8b8b8, -6px -6px 12px #f5f5f5" }}
            className="rounded-2xl bg-zinc-200">

            <div className="flex min-w-80 items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-3">
                    {showPfp && <div className="h-10 w-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                        style={{ boxShadow: "inset 3px 3px 6px #b8b8b8, inset -3px -3px 6px #f5f5f5" }}>
                        {hasPfp ? (
                            <img src={pfp} className="w-full h-full object-cover" />
                        ) : (
                            <User className="h-5 w-5 rounded-xl text-orange-600" />
                            // <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">✓</div>
                        )}
                    </div>}

                    <p className="text-orange-600 text-sm font-mono">{text}</p>
                </div>

                {addCloseBtn && <X className="w-4 h-4 text-zinc-400 transition hover:text-zinc-700" onClick={onClose} />}

            </div>
        </motion.div>
    )
}

export default Toast