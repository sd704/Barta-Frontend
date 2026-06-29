import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPeople } from "../redux/peopleSlice"
import { CONNECTION_TABS } from "../utils/connectionConfig"
const TABS = Object.keys(CONNECTION_TABS)

const useFetchAllConnections = (setLoading, loggedInUserId) => {
    const peopleStore = useSelector(store => store.people ?? {})
    const people = Object.values(peopleStore)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)

    const fetchList = async (tab) => {
        if (!loggedInUserId) return
        const listLength = people.filter(p => CONNECTION_TABS[tab].filter(p, loggedInUserId)).length
        if (listLength > 0) return

        const URL = CONNECTION_TABS[tab].endpoint
        const res = await fetch(URL, { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include" })
        const data = await res.json()
        dispatch(addPeople(data?.data.map(user => {
            const connectionData = CONNECTION_TABS[tab].connectionData(user, loggedInUserId)
            return { ...user, connectionData }
        })))
    }

    const fetchAll = async () => {
        setError(null)
        try {
            await Promise.all(TABS.map(fetchList))
        } catch (err) {
            setError(err)
            console.error("Failed to fetch connections:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAll()
    }, [dispatch])
}

export default useFetchAllConnections