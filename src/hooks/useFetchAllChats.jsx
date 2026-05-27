import { GET_CHATS } from "../utils/ApiRoutes"
import { fillMsgs } from "../redux/messageSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { addPeople } from "../redux/peopleSlice"

const useFetchAllChats = (userCount, setLoading, loggedInUserId) => {
    const dispatch = useDispatch()

    const fetchAllChats = async () => {
        const res = await fetch(GET_CHATS, { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include" })
        const rawChats = await res.json()
        const chats = rawChats?.data // [{ _id, userData, lastMessage, unreadCount, connectionData: { status, senderId, blockedByMe, blockedMe }}, {...}, {...}]
        // dispatch(addPeople({ filter: "connected", usersList: chats.map(c => c.userData), loggedInUserId }))
        dispatch(addPeople(chats.map(c => { return { ...c.userData, connectionData: c.connectionData } })))
        dispatch(fillMsgs(chats))
    }

    const runFetchAllChats = async () => {
        try {
            if (userCount <= 0) { await fetchAllChats() }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        runFetchAllChats()
    }, [])
}

export default useFetchAllChats