import { motion } from "motion/react"

const RollingDigit = ({ digit, index }) => {

    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="h-8 overflow-hidden">
            <motion.div
                className="h-full"
                animate={{ y: `-${digit * 100}%` }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.05, // stagger effect, each digit has a different delay.
                    ease: "easeInOut",
                }}>
                {digits.map((num) => <div key={num} className="h-8">{num}</div>)}
            </motion.div>
        </div>
    )
}

export default RollingDigit