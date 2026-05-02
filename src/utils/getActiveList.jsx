const getActiveList = (filter, store, loggedInUserId) => {

    if (store == null || Object.keys(store).length <= 0)
        return []

    switch (filter) {
        case "discover": return Object.values(store).filter(p => (['', 'withdraw', 'remove'].includes(p.connectionData.status) && !p.connectionData.isBlocked))
        case "received": return Object.values(store).filter(p => (p.connectionData.status === 'interested' && p.connectionData.senderId !== loggedInUserId && !p.connectionData.isBlocked))
        case "pending": return Object.values(store).filter(p => (p.connectionData.status === 'interested' && p.connectionData.senderId === loggedInUserId && !p.connectionData.isBlocked))
        case "connected": return Object.values(store).filter(p => (p.connectionData.status === 'accepted' && !p.connectionData.isBlocked))
        case "blocked": return Object.values(store).filter(p => (p.connectionData.isBlocked))
        default: return []
    }
}

export default getActiveList