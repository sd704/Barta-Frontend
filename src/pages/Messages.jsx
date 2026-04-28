import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Outlet, useNavigate } from "react-router-dom"
import { Settings, Menu } from "lucide-react"
import SearchBar from "../components/SearchBar"
import TabButton from "../components/TabButton"
import ChatItem from "../components/ChatItem"
import { useDispatch, useSelector } from "react-redux"
import useFetchAllChats from "../hooks/useFetchAllChats"
import useNetworkStatus from "../hooks/useNetworkStatus"
// import Chat from "./Chat"
// import chats from "../utils/dummyChats"

const Messages = () => {
    const user = useSelector(store => store.user)

    // Show online if network and socket are both connected
    const networkStatus = useNetworkStatus() && user?.isOnline

    const chatStore = useSelector(store => store.messages ?? {})
    const chats = Object.values(chatStore)
    const userCount = chats?.length
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("ALL");
    const FILTERS = ["ALL", "UNREAD", "GROUPS", "ARCHIVE"]
    let onlineUserCount = 0
    let unreadChatsCount = 0
    chats.forEach(c => {
        if (c.userData.isOnline) { onlineUserCount += 1 }
        if (parseInt(c.unread, 10) > 0) { unreadChatsCount += 1 }
    })
    const filteredChats = chats
        .filter(chat => chat.userData.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(chat => (chat.messages?.length ?? 0) > 0)
        .filter(chat => {
            if (activeTab === "UNREAD") return chat.unread > 0
            if (activeTab === "GROUPS") return chat.isGroup
            if (activeTab === "ARCHIVE") return chat.isArchive
            return true // ALL
        }).sort((a, b) => new Date(b.messages.at(-1).createdAt) - new Date(a.messages.at(-1).createdAt))

    const variants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.05 } } }

    useFetchAllChats(userCount)

    return (
        <div className="h-screen flex justify-center">
            <div className="w-2xl h-screen flex flex-col">

                {/* Message Page Header */}
                <div className="flex items-center justify-between pt-4 px-6 pb-6">

                    {/* Menu button */}
                    <motion.button whileTap={{ scale: 0.90 }} style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)" }}
                        className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center cursor-pointer text-zinc-700 hover:text-orange-600"
                    >
                        <Menu size={20} />
                    </motion.button>

                    {/* MESSAGES Text */}
                    <div className="text-center">
                        <h1 className="text-xl font-mono tracking-widest text-zinc-900">MESSAGES</h1>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-zinc-400 rounded-full" />
                            <div className="w-1 h-1 bg-zinc-400 rounded-full" />
                            <div className="w-1 h-1 bg-orange-600 rounded-full" />
                        </div>
                    </div>

                    {/* Settings Button */}
                    <motion.button whileTap={{ scale: 0.90 }} style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)" }}
                        className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center cursor-pointer text-zinc-700 hover:text-orange-600"
                    >
                        <Settings size={20} />
                    </motion.button>
                </div>

                {/* Online Status Display */}
                {/* mb-6 p-4 style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.8)" }} */}
                <motion.div className="py-2 px-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 ${networkStatus ? "bg-green-500 animate-pulse" : "bg-zinc-600"} rounded-full`}
                                style={networkStatus ? { boxShadow: "0 0 8px rgba(34,197,94,0.6)" } : {}} />
                            <span className="text-xs font-mono text-zinc-600 tracking-wider">{networkStatus ? "ONLINE" : "OFFLINE"}</span>
                        </div>
                        <div className="flex gap-4 text-xs font-mono text-zinc-500">
                            <span>{`${onlineUserCount} ACTIVE`}</span><span className="text-zinc-300">|</span><span>{`${unreadChatsCount} UNREAD`}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Search */}
                <div className="mb-6 px-6">
                    <SearchBar value={searchQuery} placeholder="Search chats..." onChange={setSearchQuery} />
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-6 px-6">
                    {FILTERS.map((tab, i) => <TabButton key={i} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />)}
                </div>


                {/* Chat List */}
                <motion.div variants={variants} initial="initial" animate="animate" className="py-4 px-6 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {filteredChats.map(chat => {
                        const lastMessage = chat.messages.at(-1)
                        const text = ((chat.userData._id === lastMessage.senderId) ? chat.userData.firstName : 'You') + ': ' + lastMessage.text
                        return <ChatItem key={chat.chatId} userData={chat.userData} message={text} time={lastMessage.createdAt} unread={chat.unread} isOnline={chat.userData.isOnline}
                            onClick={() => navigate(`/messages/${chat.userData._id}`)}
                        />
                    })}

                    {/* No Results Message */}
                    {filteredChats.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="p-10 text-center">
                            <p className="text-zinc-500 font-mono text-sm">NO_RESULTS</p>
                            <p className="text-zinc-400 text-xs mt-1">Try a different filter or tab</p>
                        </motion.div>
                    )}
                </motion.div>

            </div>
            <AnimatePresence mode="wait">
                {/* ChatWindow will render here */}
                <Outlet />
            </AnimatePresence>
        </div>
    )
}

export default Messages