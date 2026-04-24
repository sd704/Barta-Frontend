import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import ChatHeader from "../components/ChatHeader"
import MessageBubble from "../components/MessageBubble"
import ChatInputBox from "../components/ChatInputBox"
import { getSocket } from "../utils/socket"
import useFetchChats from "../hooks/useFetchChats"
import LoadingDots from '../components/LoadingDots'
// import dummyTexts from "../utils/dummyTexts"

const Chat = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const { uid: targetUserId } = useParams()
    const loggedInUser = useSelector(store => store.user)
    const loggedInUserId = loggedInUser?._id
    const chatStore = useSelector(store => store.messages ?? {})
    const messages = chatStore?.[targetUserId]?.messages ?? []
    const messagesEndRef = useRef(null)
    const targetUserData = chatStore?.[targetUserId]?.userData

    const handleSendMessage = (text) => {
        const socket = getSocket()
        socket.emit("sendMessage", { targetUserId, text })
    }

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }

    useEffect(() => { setLoading(true) }, [targetUserId])

    useEffect(() => { scrollToBottom() }, [messages])

    useFetchChats(targetUserId, loggedInUserId, setLoading)

    return (
        //<div className="h-screen bg-zinc-200">       
        <motion.div className="w-2xl h-screen flex flex-col"
            key="chat-window" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}>

            {/* Header */}
            <ChatHeader name={targetUserData?.name} uid={targetUserId} status="ONLINE" isOnline={true} avatar={targetUserData?.pfp} onBack={() => navigate("/messages")} />



            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-4 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
                {loading ? <LoadingDots /> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

                    {/* Date */}
                    <div className="flex items-center justify-center my-6">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="px-4 py-2 bg-zinc-200 rounded-full">
                            <span className="text-xs font-mono text-zinc-500 tracking-widest">TODAY</span>
                        </motion.div>
                    </div>

                    {messages.map((message, index) => (
                        <MessageBubble key={message._id} text={message.text} time={message.createdAt} isSent={message.senderId === loggedInUserId} isRead={message.isRead || false} />
                    ))}
                    <div ref={messagesEndRef} />
                </motion.div>}

            </div>

            {/* Typing Indicator (optional) */}
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="px-4 py-3 bg-zinc-200 rounded-xl rounded-bl-none inline-flex gap-1"
                        style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)" }}>
                        <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                        <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                    </div>
                </div>
            </motion.div>

            {/* Input Area */}
            <ChatInputBox onSend={handleSendMessage} />

        </motion.div>
        //</div>
    )
}

export default Chat