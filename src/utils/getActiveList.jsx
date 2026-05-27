const getActiveList = (filter, store, loggedInUserId) => {

    if (store == null || Object.keys(store).length <= 0)
        return []

    switch (filter) {
        case "discover": return Object.values(store).filter(p => ([null, '', 'withdraw', 'remove'].includes(p.connectionData.status) && !p.connectionData.blockedByMe))
        case "received": return Object.values(store).filter(p => (p.connectionData.status === 'interested' && p.connectionData.senderId !== loggedInUserId && !p.connectionData.blockedByMe))
        case "pending": return Object.values(store).filter(p => (p.connectionData.status === 'interested' && p.connectionData.senderId === loggedInUserId && !p.connectionData.blockedByMe))
        case "connected": return Object.values(store).filter(p => (p.connectionData.status === 'accepted' && !p.connectionData.blockedByMe))
        case "blocked": return Object.values(store).filter(p => (p.connectionData.blockedByMe))
        default: return []
    }
}

export default getActiveList