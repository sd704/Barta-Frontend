import { motion } from "motion/react"

const SideNavbarButton = ({ icon: Icon, isActive, onClick }) => {
    return (
        <motion.div className={`flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer ${isActive ? "bg-orange-600 text-zinc-200" : "text-zinc-500 hover:text-orange-600"}`}
            whileTap={{ scale: 0.90 }}
            whileHover={{ x: 2 }}
            style={{ boxShadow: "2px 2px 4px #79797a, -2px -2px 4px #ffffff" }}
            onClick={onClick}>
            <Icon className="w-5 h-5" />
        </motion.div >
    )
}

export default SideNavbarButton