import { useState } from "react"
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

const useConnectionActions = (triggerToast) => {
    const [loadingIds, setLoadingIds] = useState(new Set())

    const [connect] = useConnectMutation()
    const [ignore] = useIgnoreMutation()
    const [accept] = useAcceptMutation()
    const [reject] = useRejectMutation()
    const [withdraw] = useWithdrawMutation()
    const [remove] = useRemoveMutation()
    const [block] = useBlockMutation()
    const [unblock] = useUnblockMutation()

    const mutations = { connect, ignore, accept, reject, withdraw, remove, block, unblock }

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

            // Toast Success
            const toastProps = {
                hasPfp: Boolean(user.pfp),
                pfp: user.pfp ?? '',
                text: action.toast.success(user.name)
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