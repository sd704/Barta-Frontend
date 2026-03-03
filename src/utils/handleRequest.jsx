import { fillConnections, removeConnection } from "../redux/connectionSlice"
import { updatePerson } from "../redux/peopleSlice"
import endpoints from "../utils/endpoints"

const handleUpdate = async (URL) => {
    try {
        const res = await fetch(URL, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })
        const data = await res.json()
        return data?.data
    } catch (err) {
        console.error(err)
        return null
    }
}

const handleRequest = async (event, userObj, type, dispatch) => {

    try {
        if (event) {
            event.stopPropagation() // To prevent parent onClick from executing
        }

        if (!endpoints[type]) {
            console.error("Invalid request type:", type)
            return
        }

        const { route, removeFrom, addTo } = endpoints[type]

        const reqObj = route(userObj._id)
        const res = await fetch(reqObj.url, {
            method: reqObj.requestType,
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })

        const data = await res.json()

        if (!res.ok) {
            console.error(data?.message)
            return
        }

        if (removeFrom) {
            dispatch(removeConnection({ filter: removeFrom.filter, id: userObj._id }))
        }

        if (addTo) {
            dispatch(fillConnections({ filter: addTo.filter, listData: [userObj] }))
        }

        const { sender, receiver, status } = data.data ?? {}

        let obj = { ...userObj }
        obj["connectionData"] = {
            senderId: sender?._id ?? '',
            receiverId: receiver?._id ?? '',
            status: status ?? '',
            isBlocked: type === "block"
        }
        dispatch(updatePerson(obj))

    } catch (err) {
        console.error(err)
    }
}

export default handleRequest