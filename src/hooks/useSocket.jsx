import { useEffect } from "react"
import { getSocket } from "../utils/socket"
import { useDispatch, useSelector } from "react-redux"
import { setPresence } from "../redux/presenceSlice"
import { appendMsg, updateMsgInInbox } from "../redux/cacheHelpers/chatCacheHelpers"
import { markMsgsSeen, markInboxItemSeen } from "../redux/cacheHelpers/msgSeenHelpers"
import baseApi from "../redux/api/baseApi"

const useSocket = (loggedInUserId) => {
    const dispatch = useDispatch()

    // We subscribe isOnline data using chatStore uids, so if a new chat is opened, that uid is not subscribed
    // So if new chat user is a friend, add to store to subscribe
    // We don't need to skip subscribe to online status of blocked users, Done on API lvl

    // We use useSelector instead of useGet.. so that we don't fetch here, useSelector is read-only
    const chats = useSelector(baseApi.endpoints.getAllChats.select(undefined))?.data ?? []
    const userIds = chats.map(c => c.peerId).filter(Boolean) // filter(Boolean) drops falsy values (undefined, null, 0, '')

    useEffect(() => {
        if (!loggedInUserId) { return }

        const socket = getSocket()

        socket.connect()
        const onConnect = () => { socket.emit("joinRoom") }
        socket.on("connect", onConnect)

        // Receiving msg from server
        const addMsgHandler = ({ chatId, lastMessage, receiver, connectionData }) => {
            const peerId = receiver._id
            const peer = { ...receiver, name: `${receiver.firstName} ${receiver.lastName}`, connectionData }
            dispatch(appendMsg({ peerId, chatId, lastMessage, loggedInUserId }))
            dispatch(updateMsgInInbox({ peerId, peer, chatId, lastMessage, loggedInUserId }))
        }
        socket.on("messageReceived", addMsgHandler)

        // Update messages as seen
        const msgSeenHandler = ({ receiverId: peerId, msgReceiverId, stringChatId: chatId, stringMessageIds: msgIds }) => {
            const counter = { readCount: 0 }

            // we sent reference of the obj, so modifying it will modify that obj
            dispatch(markMsgsSeen({ peerId, chatId, msgIds, msgReceiverId, loggedInUserId, counter }))
            dispatch(markInboxItemSeen({ peerId, chatId, msgIds, msgReceiverId, loggedInUserId, readCount: counter.readCount }))
        }
        socket.on("msgSeenSuccess", msgSeenHandler)

        socket.on("connect_error", (err) => {
            console.log(err) // "INVALID_TOKEN"
        })

        const handlePresence = ({ uid, status, lastSeen }) => { dispatch(setPresence({ uid, isOnline: status, lastSeen })) }
        socket.on("presence:initial", handlePresence)
        socket.on("presence:update", handlePresence)

        const handleDisconnect = () => { dispatch(setPresence({ uid: loggedInUserId, isOnline: false })) }
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
        if (!userIds.length) return

        const socket = getSocket()
        socket.emit("presence:subscribe", { userIds })
    }, [userIds.join('|')])
    // we use join because without it userIds is a new array on every render (even if ids are same)
    // which will trigger useEffect() for no reason
}

export default useSocket