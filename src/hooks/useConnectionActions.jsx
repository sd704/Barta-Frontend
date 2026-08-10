import { useState } from "react"
import { useDispatch } from "react-redux"
import { updatePerson } from "../redux/peopleSlice"
import {
    useConnectMutation,
    useIgnoreMutation,
    useAcceptMutation,
    useRejectMutation,
    useWithdrawMutation,
    useRemoveMutation,
    useBlockMutation,
    useUnblockMutation
} from "../redux/api/requestsApi"

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

const useConnectionActions = (triggerToast) => {

    const dispatch = useDispatch()
    const [loadingIds, setLoadingIds] = useState(new Set())


    const [connect] = useConnectMutation()
    const [ignore] = useIgnoreMutation()
    const [accept] = useAcceptMutation()
    const [reject] = useRejectMutation()
    const [withdraw] = useWithdrawMutation()
    const [remove] = useRemoveMutation()
    const [block] = useBlockMutation()
    const [unblock] = useUnblockMutation()

    const mutations = {
        connect, ignore, accept, reject, withdraw, remove, block, unblock
    }

    const sendRequest = async (event, user, action) => {

        event?.stopPropagation() // To prevent parent onClick from executing

        // Start loading
        setLoadingIds(prev => {
            const next = new Set(prev)
            next.add(user._id)
            return next
        })

        const triggerQuery = mutations[action.type]
        if (!triggerQuery) return

        try {

            const response = await triggerQuery(user._id).unwrap()

            const updatedUser = mapConnectionResponse(user, response, action.type)
            // dispatch(updatePerson(updatedUser)) // remove after migration

            // Toast Success
            const toastProps = {
                hasPfp: Boolean(updatedUser.pfp),
                pfp: updatedUser.pfp ?? '',
                text: action.toast.success(updatedUser.name)
            }
            triggerToast(toastProps)

        } catch (err) {
            // Toast Error
            const toastProps = {
                hasPfp: Boolean(user.pfp),
                pfp: user.pfp ?? '',
                text: action.toast.error,
            }
            triggerToast(toastProps)
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

    const isLoading = (userId) => loadingIds.has(userId)
    return { sendRequest, isLoading }
}

export default useConnectionActions