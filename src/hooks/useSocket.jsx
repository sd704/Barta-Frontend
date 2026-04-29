import { useEffect } from "react"
import { getSocket } from "../utils/socket"
import { useDispatch, useSelector } from "react-redux"
import { addMsg, markAsSeen, updateIsOnline } from "../redux/messageSlice"
import { updateNetwork } from "../redux/userSlice"

const useSocket = (loggedInUserId) => {
    const dispatch = useDispatch()
    const chatStore = useSelector(store => store.messages ?? {})
    const userIds = Object.keys(chatStore)
    const userCount = userIds.length

    useEffect(() => {
        if (!loggedInUserId) { return }

        const socket = getSocket()

        const onConnect = () => { socket.emit("joinRoom") }
        socket.on("connect", onConnect)

        // Receiving msg from server
        const addMsgHandler = ({ chatId, lastMessage, receiver }) => {
            dispatch(addMsg({ chatId, lastMessage, receiver, loggedInUserId }))
        }
        socket.on("messageReceived", addMsgHandler)

        // Update messages as seen
        const msgSeenHandler = ({ receiverId, msgReceiverId, stringChatId, stringMessageIds }) => {
            dispatch(markAsSeen({ receiverId, msgReceiverId, stringChatId, stringMessageIds, loggedInUserId }))
        }
        socket.on("msgSeenSuccess", msgSeenHandler)

        socket.on("connect_error", (err) => {
            console.log(err) // "INVALID_TOKEN"
        })

        const handlePresence = ({ uid, status }) => {
            if (uid === loggedInUserId) {
                dispatch(updateNetwork(status))
            } else {
                dispatch(updateIsOnline({ uid, status }))
            }
        }
        socket.on("presence:initial", handlePresence)
        socket.on("presence:update", handlePresence)


        const handleDisconnect = (reason) => { dispatch(updateNetwork(false)) }
        socket.on('disconnect', handleDisconnect)
        socket.on('disconnecting', handleDisconnect)

        // When component unloads, disconnect socket
        return () => {
            socket.off("connect", onConnect)
            socket.off("messageReceived", addMsgHandler)
            socket.off("msgSeenSuccess", msgSeenHandler)
            socket.off("connect_error")
            socket.off("presence:initial", handlePresence)
            socket.off("presence:update", handlePresence)
            socket.off("disconnect", handleDisconnect)
            socket.off("disconnecting", handleDisconnect)
            socket.disconnect()
        }
    }, [loggedInUserId])

    useEffect(() => {
        const socket = getSocket()

        if (userIds && userIds.length > 0) {
            socket.emit("presence:subscribe", { userIds })
        }
    }, [userCount])
}

export default useSocket