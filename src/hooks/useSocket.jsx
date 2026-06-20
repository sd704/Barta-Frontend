import { useEffect } from "react"
import { getSocket } from "../utils/socket"
import { useDispatch, useSelector } from "react-redux"
import { addMsg, markAsSeen } from "../redux/messageSlice"
import { addPerson, updateIsOnline } from "../redux/peopleSlice"
import { updateNetwork } from "../redux/userSlice"

const useSocket = (loggedInUserId) => {
    const dispatch = useDispatch()
    // We subscribe isOnline data using chatStore uids, so if a new chat is opened, that uid is not subscribed
    // So if new chat user is a friend, add to store to subscribe
    const chatStore = useSelector(store => store.messages ?? {})
    const peopleStore = useSelector(store => store.people ?? {})
    // We don't need to subscribe to online status of blocked users, Done on API lvl
    const userIds = Object.keys(chatStore)
    const userCount = userIds.length

    useEffect(() => {
        if (!loggedInUserId) { return }

        const socket = getSocket()

        socket.connect()
        const onConnect = () => { socket.emit("joinRoom") }
        socket.on("connect", onConnect)

        // Receiving msg from server
        const addMsgHandler = ({ chatId, lastMessage, receiver, connectionData }) => {
            receiver["connectionData"] = connectionData
            dispatch(addPerson(receiver))
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

        const handlePresence = ({ uid, status, lastSeen }) => {
            if (uid === loggedInUserId) {
                dispatch(updateNetwork(status))
            } else {
                dispatch(updateIsOnline({ uid, status, lastSeen }))
            }
        }
        socket.on("presence:initial", handlePresence)
        socket.on("presence:update", handlePresence)


        const handleDisconnect = (reason) => { dispatch(updateNetwork(false)) }
        socket.on('disconnecting', handleDisconnect)
        socket.on('disconnect', handleDisconnect)

        // When component unloads, disconnect socket
        return () => {
            socket.off("connect", onConnect)
            socket.off("messageReceived", addMsgHandler)
            socket.off("msgSeenSuccess", msgSeenHandler)
            socket.off("connect_error")
            socket.off("presence:initial", handlePresence)
            socket.off("presence:update", handlePresence)
            socket.off("disconnecting", handleDisconnect)
            socket.off("disconnect", handleDisconnect)
            socket.disconnect()
        }
    }, [loggedInUserId])

    useEffect(() => {
        const socket = getSocket()

        if (userIds && userIds.length > 0) {
            socket.emit("presence:subscribe", { userIds })
        }
    }, [userIds])
}

export default useSocket