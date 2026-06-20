const getLastSeenTime = (lastSeenTime) => {
    const now = new Date()
    const lastSeen = new Date(lastSeenTime)
    const diffMs = now - lastSeen

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(diffMs / (1000 * 60 * 60))

    const todayStr = now.toDateString()
    const lastSeenStr = lastSeen.toDateString()

    // Same calendar day
    if (todayStr === lastSeenStr) {
        if (seconds < 60) return "a few seconds ago"
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`
    }

    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)

    const timeStr = lastSeen.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true, })

    // Yesterday
    if (lastSeenStr === yesterday.toDateString()) return `Yesterday at ${timeStr}`

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    // Within last week
    if (diffDays < 7) {
        const weekday = lastSeen.toLocaleDateString(undefined, { weekday: "long", })
        return `${weekday} at ${timeStr}`
    }

    // Same year
    if (lastSeen.getFullYear() === now.getFullYear()) {
        const dateStr = lastSeen.toLocaleDateString(undefined, { day: "numeric", month: "long", })
        return `${dateStr} at ${timeStr}`
    }

    // Different year
    return lastSeen.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric", })
}

export default getLastSeenTime