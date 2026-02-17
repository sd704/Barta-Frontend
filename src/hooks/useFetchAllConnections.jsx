import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DISCOVER_URL, RECEIVED_URL, PENDING_URL, CONNECTED_URL, BLOCKED_URL } from "../utils/ApiRoutes"
import { fillDiscover, fillReceived, fillPending, fillConnected, fillBlocked } from "../redux/connectionSlice"

const useFetchAllConnections = () => {
    const connectionStore = useSelector(store => store.connection)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const endpoints = [
        { filter: "discover", url: DISCOVER_URL, reducer: fillDiscover },
        { filter: "received", url: RECEIVED_URL, reducer: fillReceived },
        { filter: "pending", url: PENDING_URL, reducer: fillPending },
        { filter: "connected", url: CONNECTED_URL, reducer: fillConnected },
        { filter: "blocked", url: BLOCKED_URL, reducer: fillBlocked },
    ]

    const fetchList = async ({ filter, url, reducer }) => {
        if (connectionStore[filter].length > 0) return
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })
        const data = await res.json()
        dispatch(reducer(data?.data))
    }

    const fetchAll = async () => {
        setLoading(true)
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

    return {
        loading,
        error,
        refetch: fetchAll
    }
}


export default useFetchAllConnections