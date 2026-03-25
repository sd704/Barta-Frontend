import { motion } from "motion/react"
import { UserX, ArrowLeft } from "lucide-react"
import SubmitButton from "../components/SubmitButton"
import { useNavigate } from 'react-router-dom'

const UserNotFound = () => {
    const navigate = useNavigate()
    const index = 2

    const handleBack = () => { navigate(-1) }

    return (
        <div className="size-full flex items-center justify-center">
            <motion.div className="w-full max-w-sm rounded-3xl bg-zinc-200 px-8 py-10 relative"
                style={{ boxShadow: "12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.8)" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

                {/* Corner Details - Neumorphic dots */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-zinc-200 rounded-full"
                    style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                <div className="absolute top-4 right-4 w-3 h-3 bg-zinc-200 rounded-full"
                    style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-zinc-200 rounded-full"
                    style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-zinc-200 rounded-full"
                    style={{ boxShadow: "3px 3px 6px rgba(0,0,0,0.2), -2px -2px 4px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,100,0,0.3)" }} />

                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full"
                        style={{ boxShadow: "inset 4px 4px 8px #c5c5c8, inset -4px -4px 8px #ffffff" }}>
                        <UserX className="h-8 w-8 text-zinc-700" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Message */}
                <h1 className="mb-2 text-center text-xl uppercase font-mono tracking-widest text-zinc-900 ">User Not Found!</h1>
                <p className="mb-8 text-center text-xs leading-relaxed tracking-wide font-mono text-zinc-500">
                    The profile you're looking for doesn't exist or may have been removed.
                </p>

                <SubmitButton onClick={handleBack}><ArrowLeft size={16} />GO BACK</SubmitButton>


                {/* Corner Details - dots */}
                <div className="flex flex-row-reverse justify-between items-center px-4 mt-6">
                    <div className="flex gap-2">
                        {[0, 1, 2].map((num) => {
                            const activeDot = num === index
                            return <div key={num}
                                className={`w-2 h-2 rounded-full ${activeDot ? "bg-orange-600" : "bg-zinc-200"}`}
                                style={{
                                    boxShadow: activeDot
                                        ? "3px 3px 6px rgba(255,100,0,0.4), -2px -2px 4px rgba(255,150,50,0.3)"
                                        : "inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.7)",
                                }}
                            />
                        })}
                    </div>
                </div>

            </motion.div>


            {/* Ambient floating elements */}
            <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-zinc-200 shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff] opacity-40"
            />

            <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-zinc-200 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] opacity-40"
            />
        </div >
    )
}

export default UserNotFound