import { GET_CHATS } from "../utils/ApiRoutes"
import { fillMsgs } from "../redux/messageSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const useFetchAllChats = () => {
    const dispatch = useDispatch()

    const fetchAllChats = async () => {
        const res = await fetch(GET_CHATS, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })

        const rawChats = await res.json()
        const chats = rawChats?.data // { _id, userData, lastMessage }
        const allMessages = chats.map(c => {
            return {
                chatId: c._id,
                isOnline: true,
                unread: 3,
                isGroup: false,
                isArchive: false,
                userData: {
                    ...c.userData,
                    name: c.userData.firstName + " " + c.userData.lastName,
                },
                messages: [c.lastMessage]
            }
        })

        dispatch(fillMsgs(allMessages))
    }

    useEffect(() => {
        try {
            fetchAllChats()
        } catch (err) {
            console.error(err)
        }
    }, [])
}

export default useFetchAllChats