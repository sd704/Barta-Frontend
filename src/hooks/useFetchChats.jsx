import { GET_USER_BY_ID, GET_MESSSAGES } from "../utils/ApiRoutes"
import { useDispatch, useSelector } from "react-redux"
import { addPerson } from "../redux/peopleSlice"
import { fillConvo } from "../redux/messageSlice"
import { useEffect } from "react"

const useFetchChats = (targetUserId, loggedInUserId, setLoading) => {
    const dispatch = useDispatch()
    const peopleStore = useSelector(store => store.people ?? {})

    const fetchUser = async () => {
        const res = await fetch(GET_USER_BY_ID(targetUserId), { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include" })
        const data = await res.json()
        if (data?.data) {
            dispatch(addPerson(data.data))
        }
    }

    const fetchChats = async () => {
        const res = await fetch(GET_MESSSAGES(targetUserId), { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include" })
        const resObj = await res.json()

        if (res.ok) {
            const chat = resObj?.data // chat -> { _id, participants:[u1,u2], messages}

            const targetUser = chat?.participants?.find(p => p._id !== loggedInUserId) || null

            if (chat?._id && targetUser) {
                const chatObj = { chatId: chat._id, userData: { ...targetUser }, messages: chat.messages }
                dispatch(fillConvo(chatObj))
            }
        }
    }

    const runFetch = async () => {
        try {
            if (!peopleStore?.[targetUserId]) {
                await fetchUser()
            }
            if (peopleStore?.[targetUserId]) {
                await fetchChats()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        runFetch()
    }, [targetUserId])
}

export default useFetchChats