const getActiveList = (filter, store, loggedInUserId) => {

    if (store == null || Object.keys(store).length <= 0)
        return []

    const people = Object.values(store)

    switch (filter) {
        case "discover": return people.filter(p => ([null, '', 'withdraw', 'remove'].includes(p.connectionData.status) && !p.connectionData.blockedByMe))
        case "received": return people.filter(p => (p.connectionData.status === 'interested' && p.connectionData.senderId !== loggedInUserId && !p.connectionData.blockedByMe))
        case "pending": return people.filter(p => (p.connectionData.status === 'interested' && p.connectionData.senderId === loggedInUserId && !p.connectionData.blockedByMe))
        case "connected": return people.filter(p => (p.connectionData.status === 'accepted' && !p.connectionData.blockedByMe))
        case "blocked": return people.filter(p => (p.connectionData.blockedByMe))
        default: return []
    }
}

export default getActiveList