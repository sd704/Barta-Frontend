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
        const chats = rawChats?.data // [{ _id, userData, lastMessage, unreadCount }, {...}, {...}]
        dispatch(addPeople({ filter: "connected", usersList: chats.map(c => c.userData), loggedInUserId }))
        dispatch(fillMsgs(chats))
        setLoading(false)
    }

    useEffect(() => {
        try {
            if (userCount <= 0) {
                fetchAllChats()
            }
        } catch (err) {
            console.error(err)
        } finally {

        }
    }, [])
}

export default useFetchAllChats