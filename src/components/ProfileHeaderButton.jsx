import { motion } from "motion/react"

const ProfileHeaderButton = ({ variant = 'default', onClickAction, children }) => {
    return (
        <motion.button
            className={`px-6 py-2.5 rounded-xl cursor-pointer ${variant === 'default' ? 'bg-zinc-200 text-zinc-900' : 'bg-orange-500 text-white'}`}
            style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)" }}
            whileTap={{ scale: 0.90 }}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClickAction}>
            {children}
        </motion.button>
    )
}

export default ProfileHeaderButton