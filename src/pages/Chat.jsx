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
    const [isTyping, setIsTyping] = useState(false)
    const { uid: targetUserId } = useParams()
    const loggedInUser = useSelector(store => store.user)
    const loggedInUserId = loggedInUser?._id
    const chatStore = useSelector(store => store.messages ?? {})
    const messages = chatStore?.[targetUserId]?.messages ?? []
    const messagesEndRef = useRef(null)
    const targetUserData = chatStore?.[targetUserId]?.userData

    const getDateLabel = (msgTime) => {
        const now = new Date()
        const msgDate = new Date(msgTime)

        const todayStr = now.toDateString()
        const msgStr = msgDate.toDateString()

        if (msgStr === todayStr) return "Today"

        const yesterday = new Date()
        yesterday.setDate(now.getDate() - 1)

        if (msgStr === yesterday.toDateString()) return "Yesterday"

        const diffDays = Math.floor((now - msgDate) / (1000 * 60 * 60 * 24))

        // undefined -> tells the browser: Use the user’s system/browser locale automatically

        if (diffDays < 7) { return msgDate.toLocaleDateString(undefined, { weekday: "long" }) }

        return msgDate.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
    }

    const addDateSeparators = (messages) => {
        const result = []
        let lastDate = null

        messages.forEach((msg) => {
            const msgDate = new Date(msg.createdAt).toDateString()

            if (msgDate !== lastDate) {
                result.push({ type: "DATE", data: getDateLabel(msg.createdAt) })
                lastDate = msgDate
            }

            result.push({ type: "MESSAGE", data: msg })
        })

        return result
    }

    const handleSendMessage = (text) => {
        const socket = getSocket()
        socket.emit("sendMessage", { targetUserId, text })
    }

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }

    useEffect(() => {
        setLoading(true)
        const socket = getSocket()
        const handleTyping = ({ userId, status }) => {
            if (userId === targetUserId) {
                setIsTyping(status)
                if (status)
                    scrollToBottom()
            }
        }
        socket.on("typing", handleTyping)

        return () => { socket.off("typing", handleTyping) }
    }, [targetUserId])

    useEffect(() => {
        scrollToBottom()
        const socket = getSocket()
        // msgs where targetUser is sender and isRead is false
        const stringMessageIds = messages.filter(msg => msg.senderId === targetUserId && !msg.isRead).map(m => m._id)
        const stringChatId = chatStore?.[targetUserId]?.chatId

        if (stringMessageIds.length > 0) {
            socket.emit("updateMsgSeen", { stringChatId, stringMessageIds })
        }
    }, [targetUserId, messages])

    useFetchChats(targetUserId, loggedInUserId, setLoading)

    return (
        //<div className="h-screen bg-zinc-200">       
        <motion.div className="w-2xl h-screen flex flex-col"
            key="chat-window" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}>

            {/* Header */}
            <ChatHeader name={targetUserData?.name} uid={targetUserId} isOnline={targetUserData?.isOnline} avatar={targetUserData?.pfp} onBack={() => navigate("/messages")} />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-4 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
                {loading ? <LoadingDots /> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

                    {
                        addDateSeparators(messages).map(({ type, data }) => {
                            if (type === "DATE") {
                                return <div className="flex items-center justify-center my-6">
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        className="px-4 py-2 bg-zinc-200 rounded-full">
                                        <span className="text-xs font-mono text-zinc-500 tracking-widest">{data}</span>
                                    </motion.div>
                                </div>
                            }
                            const message = data
                            const timeStamp = new Date(message.createdAt)
                            const strTime = timeStamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
                            return <MessageBubble key={message._id} text={message.text} time={strTime} isSent={message.senderId === loggedInUserId} isRead={message.isRead || false} />
                        })
                    }

                    {/* Typing Indicator (optional) */}
                    <AnimatePresence mode="wait">
                        {isTyping &&
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mb-4 flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="px-4 py-3 bg-zinc-200 rounded-xl rounded-bl-none inline-flex gap-1 items-center"
                                        style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.7)" }}>
                                        <span className="mr-1 text-sm font-mono text-orange-600">{`${targetUserData.firstName} is typing`}</span>
                                        <motion.div className="w-2 h-2 bg-orange-600 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                                        <motion.div className="w-2 h-2 bg-orange-600 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                                        <motion.div className="w-2 h-2 bg-orange-600 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                                    </div>
                                </div>

                            </motion.div>}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                </motion.div>}

            </div>



            {/* Input Area */}
            <ChatInputBox onSend={handleSendMessage} targetUserId={targetUserId} />

        </motion.div>
        //</div>
    )
}

export default Chat