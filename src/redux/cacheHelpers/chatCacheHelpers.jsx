import baseApi from "../api/baseApi"

const appendMsg = ({ peerId, chatId, lastMessage, loggedInUserId }) => {
    return (dispatch, getState) => {
        const existingChat = baseApi.endpoints.getChats.select(peerId)(getState())?.data

        // upsert new chat
        if (!existingChat) {
            dispatch(baseApi.util.upsertQueryData('getChats', peerId, {
                chatId,
                peerId,
                userData: { _id: peerId }, // Needed for fillConvo(), remove after migration
                messages: [lastMessage],
                unread: lastMessage.senderId !== loggedInUserId ? 1 : 0
            }))
            return
        }

        // Append to existing chat
        dispatch(baseApi.util.updateQueryData('getChats', peerId, (draft) => {
            draft.chatId = draft.chatId ?? chatId
            draft.messages.push(lastMessage)
            if (lastMessage.senderId !== loggedInUserId) {
                draft.unread = (draft.unread ?? 0) + 1
            }
        }))
    }
}

const updateMsgInInbox = ({ peerId, peer, chatId, lastMessage, loggedInUserId }) => {
    return baseApi.util.updateQueryData('getAllChats', undefined, (draft) => {
        if (!Array.isArray(draft)) return

        // Get inbox row index of given peer, peerId is ID of person we received/sent latest message
        const peerInboxIndex = draft.findIndex(c => c.peerId === peerId)

        if (peerInboxIndex === -1) {
            // if peerId doesn't exist in existing inbox, peerInboxIndex -> -1
            // which means this is a new conversation

            // unshift is an Array method that inserts at front -> arr[0]
            draft.unshift({
                chatId, peerId, isGroup: false, isArchive: false, messages: [lastMessage], peer: peer ?? null,
                unread: lastMessage.senderId !== loggedInUserId ? 1 : 0,
            })
            return
        }

        const row = draft[peerInboxIndex]
        row.chatId = chatId
        row.messages = [lastMessage]
        if (lastMessage.senderId !== loggedInUserId) { row.unread = (row.unread ?? 0) + 1 }
        if (peer) { row.peer = { ...row.peer, ...peer } }

        draft.splice(peerInboxIndex, 1) // remove 'row' at peerInboxIndex
        draft.unshift(row) // put 'row' at [0], so it comes on top
    })
}

export { appendMsg, updateMsgInInbox }
// draft is simply the cache of RTK query after transform