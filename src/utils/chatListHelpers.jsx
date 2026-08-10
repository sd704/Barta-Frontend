const getChatListStats = (chats, presence) => {
    let onlineUserCount = 0
    let unreadChatsCount = 0

    chats.forEach(c => {
        if (presence[c.peerId]?.isOnline) onlineUserCount++
        if (Number(c.unread) > 0) unreadChatsCount++
    })

    return { onlineUserCount, unreadChatsCount }
}

const filterAndSortChats = (chats, searchQuery, activeTab) => {
    const q = searchQuery?.toLowerCase()
    return chats
        .filter(chat => chat.peer?.name.toLowerCase().includes(q))
        .filter(chat => (chat.messages?.length ?? 0) > 0)
        .filter(chat => {
            if (activeTab === "UNREAD") return chat.unread > 0
            if (activeTab === "GROUPS") return chat.isGroup
            if (activeTab === "ARCHIVE") return chat.isArchive
            return true // ALL
        }).sort((a, b) => new Date(b.messages.at(-1).createdAt) - new Date(a.messages.at(-1).createdAt))
}

const getChatPreviewText = (chat) => {
    const lastMessage = chat.messages?.at(-1)
    if (!lastMessage) return ""

    const sender = chat.peerId === lastMessage.senderId ? chat.peer?.firstName : "You"
    return `${sender}: ${lastMessage.text}`
}

export { getChatListStats, filterAndSortChats, getChatPreviewText }