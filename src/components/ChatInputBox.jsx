import { motion } from "motion/react"
import { useState } from "react"
import { Send, Paperclip, Smile, Mic } from "lucide-react"

const ChatInputBox = ({ onSend }) => {
    const [message, setMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const handleSend = () => {
        if (message.trim()) {
            onSend(message)
            setMessage("")
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="bg-zinc-200 p-4 sticky bottom-0">
            <div className="flex items-end gap-2">

                {/* Action Buttons */}
                <div className="flex gap-2 pb-1">

                    {/* Attachment */}
                    <motion.button className="w-9 h-9 bg-zinc-200 rounded-xl flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                        style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.7)" }}>
                        <Paperclip size={16} className="text-zinc-600" />
                    </motion.button>

                    {/* Emoji */}
                    <motion.button className="w-9 h-9 bg-zinc-200 rounded-xl flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                        style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.7)" }}>
                        <Smile size={16} className="text-zinc-600" />
                    </motion.button>
                </div>

                {/* Input Field */}
                <motion.textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="TYPE MESSAGE..."
                    rows={1}
                    className="rounded-2xl bg-zinc-200 w-full px-4 py-3 border-none outline-none font-mono text-sm text-zinc-900 placeholder:text-zinc-400 resize-none"
                    style={{ maxHeight: "120px" }}
                    animate={{
                        boxShadow: isFocused
                            ? "inset 6px 6px 12px rgba(0,0,0,0.12), inset -4px -4px 10px rgba(255,255,255,0.9)"
                            : "inset 4px 4px 8px rgba(0,0,0,0.08), inset -3px -3px 6px rgba(255,255,255,0.8)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />

                {/* Send/Record Button */}
                {message.trim() ? (
                    <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center shrink-0"
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSend}
                        style={{ boxShadow: "6px 6px 12px rgba(0,0,0,0.4), -3px -3px 8px rgba(40,40,40,0.2)" }}>
                        <Send size={18} className="text-zinc-100" />
                    </motion.button>
                ) : (
                    <motion.button
                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${isRecording ? "bg-orange-500" : "bg-zinc-200"}`}
                        whileTap={{ scale: 0.9 }}
                        onMouseDown={() => setIsRecording(true)}
                        onMouseUp={() => setIsRecording(false)}
                        onMouseLeave={() => setIsRecording(false)}
                        animate={{
                            boxShadow: isRecording
                                ? "inset 4px 4px 8px rgba(0,0,0,0.3), inset -2px -2px 6px rgba(255,120,0,0.3)"
                                : "6px 6px 12px rgba(0,0,0,0.15), -4px -4px 10px rgba(255,255,255,0.7)"
                        }}>
                        <motion.div
                            animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
                            transition={{ repeat: isRecording ? Infinity : 0, duration: 1 }}>
                            <Mic size={18} className={isRecording ? "text-white" : "text-zinc-600"} />
                        </motion.div>
                    </motion.button>
                )}
            </div>
        </div>
    )
}

export default ChatInputBox