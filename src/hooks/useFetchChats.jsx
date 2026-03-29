import { GET_MESSSAGES } from "../utils/ApiRoutes"
import { useDispatch } from "react-redux"
import { fillConvo } from "../redux/messageSlice"
import { useEffect } from "react"

const useFetchChats = (targetUserId, loggedInUserId) => {
    const dispatch = useDispatch()

    const fetchChats = async () => {
        const res = await fetch(GET_MESSSAGES(targetUserId), {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })
        const resObj = await res.json()
        const chat = resObj?.data

        // chat.data -> { _id, participants:[u1,u2], messages, lastMessage}

        const targetUser = chat?.participants?.find(p => p._id !== loggedInUserId) || null

        if (chat?._id) {
            const chatObj = {
                chatId: chat._id,
                isOnline: true,
                unread: 3,
                isGroup: false,
                isArchive: false,
                userData: {
                    ...targetUser,
                    name: targetUser.firstName + " " + targetUser.lastName,
                },
                messages: chat.messages
            }

            dispatch(fillConvo(chatObj))
        }
    }

    useEffect(() => {
        try {
            fetchChats()
        } catch (err) {
            console.error(err)
        }
    }, [targetUserId])
}

export default useFetchChats