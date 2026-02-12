import { motion } from "motion/react"

const PostCard = ({ imageUrl, likes, comments, date }) => {

    // Post Card on Profile Page

    const defaultShadow = "8px 8px 16px #c5c5c8, -8px -8px 16px #ffffff"
    const hoverShadow = "12px 12px 24px #c5c5c8, -12px -12px 24px #ffffff"

    return (
        <motion.div
            initial={false}
            whileHover={{ boxShadow: hoverShadow, y: -4 }}
            transition={{ duration: 0.3, ease: "easeInOut", }}
            style={{ boxShadow: defaultShadow }}
            className="bg-[#e4e4e7] rounded-2xl overflow-hidden cursor-pointer relative"
        >

            <div className="absolute top-4 right-4 z-20 text-xs font-mono font-bold tracking-wider text-zinc-200 rounded-lg">{date}</div>

            <div className="aspect-square overflow-hidden">
                <motion.img
                    src={imageUrl}
                    alt="Post"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut", }}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 flex items-center justify-between font-mono text-sm text-[#71717a]">
                <span>{likes} likes</span>
                <span>{comments} comments</span>
            </div>
        </motion.div>
    )
}

export default PostCard