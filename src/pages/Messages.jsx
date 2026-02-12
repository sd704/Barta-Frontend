import { useState } from "react"
import { motion } from "motion/react"
import { Settings, Menu } from "lucide-react"
import SearchBar from "../components/SearchBar"
import TabButton from "../components/TabButton"
import ChatItem from "../components/ChatItem"
import chats from "../utils/dummyChats"


const Messages = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("ALL");
    const FILTERS = ["ALL", "UNREAD", "GROUPS", "ARCHIVE"]
    const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.message.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="bg-zinc-200 min-h-screen p-4">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">

                        {/* Menu button */}
                        <motion.button whileTap={{ scale: 0.90 }} style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)" }}
                            className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center cursor-pointer "
                        >
                            <Menu size={20} className="text-zinc-700" />
                        </motion.button>

                        {/* MESSAGES Text */}
                        <div className="text-center">
                            <h1 className="text-xl font-mono tracking-widest text-zinc-900">MESSAGES</h1>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <div className="w-1 h-1 bg-zinc-400 rounded-full" />
                                <div className="w-1 h-1 bg-zinc-400 rounded-full" />
                                <div className="w-1 h-1 bg-orange-500 rounded-full" />
                            </div>
                        </div>

                        {/* Settings Button */}
                        <motion.button whileTap={{ scale: 0.90 }} style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)" }}
                            className="w-10 h-10 bg-zinc-200 rounded-xl flex items-center justify-center cursor-pointer "
                        >
                            <Settings size={20} className="text-zinc-700" />
                        </motion.button>
                    </div>

                    {/* Online Status Display */}
                    {/* mb-6 p-4 style={{ boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.8)" }} */}
                    <motion.div className="p-2 bg-zinc-200 rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
                                <span className="text-xs font-mono text-zinc-600 tracking-wider">ONLINE</span>
                            </div>
                            <div className="flex gap-4 text-xs font-mono text-zinc-500">
                                <span>24 ACTIVE</span><span className="text-zinc-300">|</span><span>3 UNREAD</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search */}
                    <SearchBar value={searchQuery} placeholder="SEARCH CHATS..." onChange={setSearchQuery} />

                    {/* Tabs */}
                    <div className="flex gap-3 mb-6">
                        {FILTERS.map((tab, i) => <TabButton key={i} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />)}
                    </div>
                </div>

                {/* Chat List */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {filteredChats.map((chat, index) => (
                        <motion.div key={chat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                            <ChatItem name={chat.name} message={chat.message} time={chat.time} unread={chat.unread} isOnline={chat.isOnline} avatar={chat.avatar}
                                onClick={() => console.log(`Open chat: ${chat.name}`)} />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    )
}

export default Messages