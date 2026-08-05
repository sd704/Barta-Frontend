const getChatListStats = (chats, peopleStore) => {
    let onlineUserCount = 0
    let unreadChatsCount = 0

    chats.forEach(c => {
        if (peopleStore[c.uid]?.isOnline) onlineUserCount++
        if (Number(c.unread) > 0) unreadChatsCount++
    })

    return { onlineUserCount, unreadChatsCount }
}

const filterAndSortChats = (chats, peopleStore, searchQuery, activeTab) => {
    const q = searchQuery?.toLowerCase()
    return chats
        .filter(chat => peopleStore[chat.uid]?.name.toLowerCase().includes(q))
        .filter(chat => (chat.messages?.length ?? 0) > 0)
        .filter(chat => {
            if (activeTab === "UNREAD") return chat.unread > 0
            if (activeTab === "GROUPS") return chat.isGroup
            if (activeTab === "ARCHIVE") return chat.isArchive
            return true // ALL
        }).sort((a, b) => new Date(b.messages.at(-1).createdAt) - new Date(a.messages.at(-1).createdAt))
}

const getChatPreviewText = (chat, peopleStore) => {
    const lastMessage = chat.messages?.at(-1)
    if (!lastMessage) return ""

    const sender = chat.uid === lastMessage.senderId ? peopleStore[chat.uid]?.firstName : "You"
    return `${sender}: ${lastMessage.text}`
}

export { getChatListStats, filterAndSortChats, getChatPreviewText }