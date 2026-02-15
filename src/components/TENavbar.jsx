
const TENavbar = () => {
    return (
        <div className="fixed left-0 z-40 w-16 h-screen py-4 flex flex-col items-center gap-6 bg-zinc-200" style={{ boxShadow: "6px 0 12px #8d8d8d" }}>

            <div className="flex items-center justify-center w-13 h-13 rounded-full bg-cover bg-center bg-no-repeat bg-[url('https://www.fomostore.in/cdn/shop/files/BISTAM375_1_819d72f0-fb42-459e-8eec-2d70e9888a19.jpg')]"></div>

            <div className="h-px w-full bg-zinc-400"></div>

            <div className="flex items-center justify-center w-13 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-12 h-19 bg-[#c7c3c0] cursor-pointer rounded-xl flex justify-center items-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-900 font-[Montserrat] text-xs -rotate-90" whileTap={{ y: 0.5 }}>FEED</motion.span>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-13 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-12 h-19 bg-[#c7c3c0] cursor-pointer rounded-xl flex justify-center items-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #ffffff 1.5px 1.5px 2px 0px inset, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #c7c3c0 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-900 font-[Montserrat] text-xs -rotate-90" whileTap={{ y: 0.5 }}>CONNECT</motion.span>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-13 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-12 h-19 bg-[#d42a02] cursor-pointer rounded-xl flex justify-center items-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #fb702c 2px 2px 10px 0px inset, #d42a02 -4px -4px 1px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #d42a02 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-200 font-[Montserrat] text-xs -rotate-90" whileTap={{ y: 0.5 }}>CHAT</motion.span>
                </motion.button>
            </div >

            <div className="flex items-center justify-center w-13 h-20 bg-[#171717] rounded-md">
                <motion.button className="w-12 h-19 bg-[#545251] cursor-pointer rounded-xl flex justify-center items-center"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.377) 10px 10px 8px, #a8a6a4 1.5px 1.5px 1px 0px inset, #545251 -3.2px -3.2px 8px 0px inset" }}
                    whileTap={{ boxShadow: "rgba(0, 0, 0, 0.377) 0px 0px 0px, inset 0.5px 0.5px 4px #000000, #545251 -3.2px -3.2px 8px 0px inset" }}
                    transition={{ duration: 0.1, ease: easeInOut }}>
                    <motion.span className="text-zinc-200 font-[Montserrat] text-xs -rotate-90" whileTap={{ y: 0.5 }}>PROFILE</motion.span>
                </motion.button>
            </div >
        </div >
    )
}

export default TENavbar