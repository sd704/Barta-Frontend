import { useEffect, useState } from "react"
import { getSocket } from "../utils/socket"

const useChatTyping = (targetUserId) => {
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        setIsTyping(false) // rest when user changes the chat user

        const socket = getSocket()

        const handleTyping = ({ userId, status }) => {
            if (userId !== targetUserId) return
            setIsTyping(status)
        }

        socket.on("typing", handleTyping)
        return () => { socket.off("typing", handleTyping) }
    }, [targetUserId])

    return isTyping
}

export default useChatTyping