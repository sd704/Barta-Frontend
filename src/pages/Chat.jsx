import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import ChatHeader from "../components/ChatHeader"
import MessageBubble from "../components/MessageBubble"
// import dummyTexts from "../utils/dummyTexts"
import ChatInputBox from "../components/ChatInputBox"
import { createSocketConnection } from "../utils/socket"
import { GET_MESSSAGES } from "../utils/ApiRoutes"

const Chat = () => {
    const navigate = useNavigate()
    const { uid: targetUserId } = useParams()
    const loggedInUser = useSelector(store => store.user)
    const loggedInUserId = loggedInUser?._id
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)
    const [targetUserData, setTargetUserData] = useState({})

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }

    const fetchMessages = async () => {
        const res = await fetch(GET_MESSSAGES(targetUserId), {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })
        const chat = await res.json()
        const participants = chat?.data?.participants
        const targetUser = participants.find(p => p._id !== loggedInUserId) || null
        setTargetUserData({
            name: `${targetUser?.firstName} ${targetUser?.lastName}`,
            pfp: targetUser?.pfp
        })

        const msgs = chat?.data?.messages
        const formattedMsgs = msgs.map(msg => {
            return {
                id: msg._id,
                text: msg.text,
                time: msg.createdAt,
                isSent: msg.senderId === loggedInUserId,
                isRead: false
            }
        })
        setMessages(formattedMsgs)
    }

    useEffect(() => {
        try {
            fetchMessages()
        } catch (err) {
            console.error(err)
        }
    }, [targetUserId])

    useEffect(() => {
        if (!loggedInUserId) { return }

        const socket = createSocketConnection()
        socket.emit("joinRoom", { loggedInUserId, targetUserId })

        // Receiving msg from server
        socket.on("messageReceived", ({ lastMessage: msg }) => {
            const newMessage = {
                id: msg._id,
                text: msg.text,
                time: msg.createdAt,
                isSent: msg.senderId === loggedInUserId,
                isRead: false
            }
            setMessages(prev => [...prev, newMessage])
        })

        // When component unloads, disconnect socket
        return () => { socket.disconnect() }
    }, [loggedInUserId, targetUserId])

    useEffect(() => { scrollToBottom() }, [messages])

    const handleSendMessage = (text) => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", { loggedInUserId, targetUserId, text })
    }

    return (
        //<div className="h-screen bg-zinc-200">       
        <motion.div className="w-2xl h-screen flex flex-col"
            key="chat-window" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}>

            {/* Header */}
            <ChatHeader name={targetUserData.name} uid={targetUserId} status="ONLINE" isOnline={true} avatar={targetUserData.pfp} onBack={() => navigate("/messages")} />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-4 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

                    {/* Date */}
                    <div className="flex items-center justify-center my-6">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="px-4 py-2 bg-zinc-200 rounded-full">
                            <span className="text-xs font-mono text-zinc-500 tracking-widest">TODAY</span>
                        </motion.div>
                    </div>

                    {messages.map((message, index) => (
                        <MessageBubble key={index} text={message.text} time={message.time} isSent={message.isSent} isRead={message.isRead} />
                    ))}
                    <div ref={messagesEndRef} />
                </motion.div>
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