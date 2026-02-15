import { easeInOut, motion } from "motion/react"

const TEButtons = () => {

    // Inspired from https://uiverse.io/Praashoo7/average-swan-99

    return (
        <div className="w-screen h-screen flex flex-col gap-4 p-2">
            <div className="flex items-center justify-center w-20 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-19 h-19 bg-[#c7c3c0] cursor-pointer rounded-xl flex items-center justify-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <svg viewBox="0 -960 960 960" className="fill-[#5f5f5f] w-6.25 h-6.25 transition-all duration-100 ease-in-out" xmlns="http://www.w3.org/2000/svg">
                        <path d="M200-440v-80h560v80H200Z"></path>
                    </svg>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-20 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-19 h-19 bg-[#c7c3c0] cursor-pointer rounded-xl flex items-center justify-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <svg viewBox="0 -960 960 960" className="fill-[#5f5f5f] w-6.25 h-6.25 transition-all duration-100 ease-in-out" xmlns="http://www.w3.org/2000/svg">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"></path>
                    </svg>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-20 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-19 h-19 bg-[#c7c3c0] cursor-pointer rounded-xl flex justify-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-900 mt-2 font-[Montserrat] text-xs" whileTap={{ y: 0.5 }}>FEED</motion.span>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-20 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-19 h-19 bg-[#c7c3c0] cursor-pointer rounded-xl flex justify-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-900 mt-2 font-[Montserrat] text-xs" whileTap={{ y: 0.5 }}>CONNECT</motion.span>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-20 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-19 h-19 bg-[#d42a02] cursor-pointer rounded-xl flex justify-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #fb702c 2px 2px 10px 0px inset, #d42a02 -4px -4px 1px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #d42a02 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-200 mt-2 font-[Montserrat] text-xs" whileTap={{ y: 0.5 }}>CHAT</motion.span>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-20 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-19 h-19 bg-[#545251] cursor-pointer rounded-xl flex justify-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #a8a6a4 1.5px 1.5px 1px 0px inset, #545251 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #545251 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-200 mt-2 font-[Montserrat] text-xs" whileTap={{ y: 0.5 }}>PROFILE</motion.span>
                </motion.button>
            </div >
        </div >
    )
}

export default TEButtons