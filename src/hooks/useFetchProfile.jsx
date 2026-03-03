import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addPerson } from "../redux/peopleSlice"
import { GET_USER_BY_ID } from "../utils/ApiRoutes"

const useFetchProfile = (uid, setLoading) => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(store => store.user)
    const people = useSelector(store => store.people)
    const connectionStore = useSelector(store => store.connection)

    const connectionTypes = ["discover", "received", "pending", "connected", "blocked"]

    const generateConnectionData = (filter, uid1, uid2) => {
        switch (filter) {
            case "discover": return { status: "", isBlocked: false }
            case "received": return { senderId: uid2, receiverId: uid1, status: "interested", isBlocked: false }
            case "pending": return { senderId: uid1, receiverId: uid2, status: "interested", isBlocked: false }
            case "connected": return { status: "accepted", isBlocked: false }
            case "blocked": return { status: "", isBlocked: true }
            default: console.error("Invalid filter:", filter)
        }
    }

    const fetchUser = async (uid) => {
        try {
            if (people?.[uid]) return

            for (const i of connectionTypes) {
                if (connectionStore[i]?.[uid]) {
                    let u = { ...connectionStore[i][uid] }
                    u["connectionData"] = generateConnectionData(i, loggedUser._id, u._id)
                    dispatch(addPerson(u))
                    return
                }
            }

            const res = await fetch(GET_USER_BY_ID(uid), {
                method: "GET",
                headers: { "Content-Type": "application/json", },
                credentials: "include"
            })
            const data = await res.json()
            dispatch(addPerson(data?.data))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser(uid)
    }, [uid])

}

export default useFetchProfile