import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DISCOVER_URL, RECEIVED_URL, PENDING_URL, CONNECTED_URL, BLOCKED_URL } from "../utils/ApiRoutes"
import { fillConnections } from "../redux/connectionSlice"

const useFetchAllConnections = (setLoading) => {
    const connectionStore = useSelector(store => store.connection)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const endpoints = [
        { filter: "discover", url: DISCOVER_URL },
        { filter: "received", url: RECEIVED_URL },
        { filter: "pending", url: PENDING_URL },
        { filter: "connected", url: CONNECTED_URL },
        { filter: "blocked", url: BLOCKED_URL },
    ]

    const fetchList = async ({ filter, url }) => {
        if (connectionStore[filter].length > 0) return
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })
        const data = await res.json()
        dispatch(fillConnections({ filter, listData: data?.data }))
    }

    const fetchAll = async () => {
        setError(null)
        try {
            await Promise.all(endpoints.map(fetchList))
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