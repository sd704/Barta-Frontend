import ChatHeader from "../components/ChatHeader"
import MessageBubble from "../components/MessageBubble"
import dummyTexts from "../utils/dummyTexts"
import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import ChatInputBox from "../components/ChatInputBox"

const Chat = () => {

    const [messages, setMessages] = useState(dummyTexts)
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            text,
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
            isSent: true,
            isRead: false
        };
        setMessages([...messages, newMessage]);
    }

    return (
        //<div className="h-screen bg-zinc-200">
        <div className="w-2xl h-screen flex flex-col">

            {/* Header */}
            <ChatHeader name="ALEX_K" status="ONLINE" isOnline={true} avatar="AK" onBack={() => console.log("Go back")} />

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
                        <MessageBubble key={message.id} text={message.text} time={message.time} isSent={message.isSent} isRead={message.isRead} />
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

        </div>
        //</div>
    )
}

export default Chat