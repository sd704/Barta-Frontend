const getDateLabel = (msgTime, today = true) => {
    const now = new Date()
    const msgDate = new Date(msgTime)

    const todayStr = now.toDateString()
    const msgStr = msgDate.toDateString()

    if (msgStr === todayStr && today) {
        return "Today"
    } else if (msgStr === todayStr && !today) {
        const strTodayTime = msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
        return strTodayTime
    }

    const yesterday = new Date()
    yesterday.setDate(now.getDate() - 1)

    if (msgStr === yesterday.toDateString()) return "Yesterday"

    const diffDays = Math.floor((now - msgDate) / (1000 * 60 * 60 * 24))

    // undefined -> tells the browser: Use the user’s system/browser locale automatically

    if (diffDays < 7) { return msgDate.toLocaleDateString(undefined, { weekday: "long" }) }

    return msgDate.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
}

export default getDateLabel

