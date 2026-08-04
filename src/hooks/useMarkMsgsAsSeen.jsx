import { useEffect } from "react"
import { getSocket } from "../utils/socket"

const useMarkMsgsAsSeen = (targetUserId, messages, chatId, loading) => {

    useEffect(() => {
        if (!targetUserId || loading) return

        const socket = getSocket()

        // msgs where targetUser is sender and isRead is false
        const stringMessageIds = messages.filter(msg => msg.senderId === targetUserId && !msg.isRead).map(m => m._id)

        if (stringMessageIds.length === 0 || !chatId) return

        socket.emit("updateMsgSeen", { stringChatId: chatId, stringMessageIds })

    }, [targetUserId, messages, chatId, loading])
}

export default useMarkMsgsAsSeen