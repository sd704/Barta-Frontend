import baseApi from "../api/baseApi"

// counter : { readCount:0 } we get reference of the obj, so modifying it will modify that obj
const markMsgsSeen = ({ peerId, chatId, msgIds, msgReceiverId, loggedInUserId, counter }) => {
    return baseApi.util.updateQueryData('getChats', peerId, (draft) => {
        if (!draft || draft.chatId !== chatId) return

        let readCount = 0
        draft.messages.forEach(msg => {
            if (msgIds.includes(msg._id) && !msg.isRead) {
                msg.isRead = true
                if (msgReceiverId === loggedInUserId) { readCount++ }
            }
        })
        draft.unread = Math.max(0, (draft.unread ?? 0) - readCount)
        if (counter) { counter.readCount = readCount }
    })
}

const markInboxItemSeen = ({ peerId, chatId, msgIds, msgReceiverId, loggedInUserId, readCount = 0 }) => {
    return baseApi.util.updateQueryData('getAllChats', undefined, (draft) => {
        if (!Array.isArray(draft)) return
        const row = draft.find(c => c.peerId === peerId)
        if (!row || row.chatId !== chatId) return

        const preview = row.messages?.[0]
        if (preview && msgIds.includes(preview._id) && !preview.isRead) {
            preview.isRead = true
        }

        if (msgReceiverId === loggedInUserId) {
            row.unread = Math.max(0, (row.unread ?? 0) - readCount)
        }
    })
}

export { markMsgsSeen, markInboxItemSeen }