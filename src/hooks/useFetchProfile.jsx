import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addPerson } from "../redux/peopleSlice"
import { GET_USER_BY_ID } from "../utils/ApiRoutes"

const connectionTypes = ["discover", "received", "pending", "connected", "blocked"]

const useFetchProfile = (uid, setLoading, setNotFound) => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(store => store.user)
    const loggedInUserId = loggedInUser?._id
    const peopleStore = useSelector(store => store.people)

    const fetchUser = async () => {
        try {

            if (peopleStore?.[uid]) return

            const res = await fetch(GET_USER_BY_ID(uid), { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include" })
            const data = await res.json()
            if (data?.data) {
                dispatch(addPerson(data.data))
            } else {
                setNotFound(true)
            }
        } catch (err) {
            setNotFound(true)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!uid || !loggedInUser) return

        if (uid === loggedInUserId) return

        fetchUser()
    }, [uid, loggedInUser])

}

export default useFetchProfile