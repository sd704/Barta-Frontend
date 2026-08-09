import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useRef, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import ChatHeader from "../components/ChatHeader"
import MessageBubble from "../components/MessageBubble"
import ChatInputBox from "../components/ChatInputBox"
import { getSocket } from "../utils/socket"
import LoadingDots from '../components/LoadingDots'
import addDateSeparators from '../utils/addDateSeparators'
import { useGetLoggedInUserQuery, useGetUserByIdQuery } from "../redux/api/userApi"
import { useGetChatsQuery } from "../redux/api/chatApi"
import useChatTyping from "../hooks/useChatTyping"
import useMarkMsgsAsSeen from "../hooks/useMarkMsgsAsSeen"
import useScrollToBottom from "../hooks/useScrollToBottom"

const Chat = () => {
    const navigate = useNavigate()
    const { uid: targetUserId } = useParams()
    const { data: loggedInUser } = useGetLoggedInUserQuery()
    const loggedInUserId = loggedInUser?._id

    const { data: person, isFetching: userIsLoading } = useGetUserByIdQuery(targetUserId, {
        skip: (!targetUserId || !loggedInUser)
    })
    const { data: chat, isFetching: msgsIsLoading } = useGetChatsQuery(targetUserId, {
        skip: (!targetUserId || !loggedInUser)
    })
    const loading = (userIsLoading && !person) || (msgsIsLoading && !chat)

    const messages = chat?.messages ?? []
    const timeLine = useMemo(() => addDateSeparators(messages), [messages])
    const messagesEndRef = useRef(null)

    const chatId = chat?.chatId
    const EMPTY = {}
    const chatUserPresence = useSelector(s => s.presence[targetUserId] ?? EMPTY)

    const isConnected = person?.connectionData?.status === 'accepted'
    const isConnectionOk = isConnected && !person?.connectionData?.blockedByMe && !person?.connectionData?.blockedMe

    const handleSendMessage = (text) => {
        const socket = getSocket()
        socket.emit("sendMessage", { targetUserId, text })
    }

    // Handles typing indicator
    const isTyping = useChatTyping(targetUserId)

    // Marks messages as seen when the user views them
    useMarkMsgsAsSeen(targetUserId, messages, chatId, loading)

    // Auto-scrolls to bottom when new messages arrive
    useScrollToBottom(messages, isTyping, messagesEndRef, loading)

    return (
        //<div className="h-screen bg-zinc-200">       
        <motion.div className="w-2xl h-screen flex flex-col"
            key={targetUserId} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.3 }}>

            {/* Header */}
            <ChatHeader
                userExists={!!person}
                isConnectionOk={isConnectionOk}
                isConnected={isConnected}
                isBlocked={person?.connectionData?.blockedByMe}
                hasBlockedMe={person?.connectionData?.blockedMe}
                name={person?.name}
                uid={targetUserId}
                isOnline={chatUserPresence?.isOnline}
                lastSeen={chatUserPresence?.lastSeen}
                avatar={person?.pfp}
                onBack={() => navigate("/messages")}
            />

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-4 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">

                {loading
                    ? <LoadingDots />
                    : !person
                        ? <div className="size-full flex flex-col items-center justify-center ">
                            <h1 className="mb-2 text-xl uppercase font-mono tracking-widest text-zinc-900">User Not Found!</h1>
                            <p className="text-xs leading-relaxed tracking-wide font-mono text-zinc-500 text-center px-40">
                                The profile you're looking for doesn't exist or may have been removed.
                            </p>
                        </div>
                        : (messages.length > 0)
                            ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

                                {
                                    timeLine.map(({ type, data }) => {
                                        if (type === "DATE") {
                                            return <div className="flex items-center justify-center my-6" key={data}>
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
                                                    <span className="mr-1 text-sm font-mono text-orange-600">{`${person.firstName} is typing`}</span>
                                                    <motion.div className="w-2 h-2 bg-orange-600 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
                                                    <motion.div className="w-2 h-2 bg-orange-600 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                                                    <motion.div className="w-2 h-2 bg-orange-600 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
                                                </div>
                                            </div>

                                        </motion.div>}
                                </AnimatePresence>

                                <div ref={messagesEndRef} />
                            </motion.div>
                            : <div className="size-full flex flex-col items-center justify-center ">
                                {!isConnected && <h1 className="mb-2 text-l font-mono tracking-widest text-zinc-900">
                                    Connect with {person?.firstName} to start a conversation
                                </h1>}
                            </div>
                }

                {/* 
                    Show <LoadingDots /> if loading == true
                    else if person is null or undefined -> Show "User Not Found!"
                    else if messages array length > 0 -> Show messages
                    else if messages length == 0 and user is not connected -> Show "Connect"
                */}

            </div>

            {/* Input Area */}
            {isConnectionOk && <ChatInputBox onSend={handleSendMessage} targetUserId={targetUserId} />}

        </motion.div>
        //</div>
    )
}

export default Chat