import { useState } from "react"
import { useDispatch } from "react-redux"
import { updatePerson } from "../redux/peopleSlice"

const requestConnection = async (url, requestType) => {

    const res = await fetch(url, {
        method: requestType, headers: { "Content-Type": "application/json" }, credentials: "include"
    })

    const data = await res.json()

    if (!res.ok) { throw new Error(data.message) }

    return data.data ?? {}
}

const mapConnectionResponse = (user, response, actionType) => {

    const { sender, status } = response

    // If status exists in res data, then save that status
    // If not, then check the type, if block/unblock -> save previous status, else status=''

    return {
        ...user,
        connectionData: {
            senderId: sender?._id ?? "",
            status: status ?? (["block", "unblock"].includes(actionType) ? user.connectionData.status : ""),
            blockedByMe: actionType === "block"
        }
    }

}

const useConnectionActions = () => {

    const dispatch = useDispatch()
    const [loadingIds, setLoadingIds] = useState(new Set())
    const isLoading = (userId) => loadingIds.has(userId)

    const sendRequest = async (event, user, action) => {

        event?.stopPropagation() // To prevent parent onClick from executing

        // Start loading
        setLoadingIds(prev => {
            const next = new Set(prev)
            next.add(user._id)
            return next
        })

        try {

            const { url, requestType } = action.endpoint(user._id)
            const response = await requestConnection(url, requestType)

            const updatedUser = mapConnectionResponse(user, response, action.type)

            dispatch(updatePerson(updatedUser))

            // triggerToast({ text: action.toast.success })

        } catch (err) {
            // triggerToast({ text: action.toast.error })
            console.error(err)
        } finally {
            // Stop loading
            setLoadingIds(prev => {
                const next = new Set(prev)
                next.delete(user._id)
                return next
            })
        }
    }

    return { sendRequest, isLoading }

}

export default useConnectionActions