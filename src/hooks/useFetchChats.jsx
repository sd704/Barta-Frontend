import { GET_MESSSAGES } from "../utils/ApiRoutes"
import { useDispatch } from "react-redux"
import { fillConvo } from "../redux/messageSlice"
import { useEffect } from "react"

const useFetchChats = (targetUserId, loggedInUserId, setLoading) => {
    const dispatch = useDispatch()

    const fetchChats = async () => {
        const res = await fetch(GET_MESSSAGES(targetUserId), { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include" })
        const resObj = await res.json()
        const chat = resObj?.data // chat -> { _id, participants:[u1,u2], messages}

        const targetUser = chat?.participants?.find(p => p._id !== loggedInUserId) || null

        if (chat?._id && targetUser) {
            const chatObj = { chatId: chat._id, userData: { ...targetUser }, messages: chat.messages }
            dispatch(fillConvo(chatObj))
        }
    }

    const runFetchChats = async () => {
        try {
            await fetchChats()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        runFetchChats()
    }, [targetUserId])
}

export default useFetchChats