import getDateLabel from "./getDateLabel"

const addDateSeparators = (messages) => {
    const result = []
    let lastDate = null

    messages.forEach((msg) => {
        const msgDate = new Date(msg.createdAt).toDateString()

        if (msgDate !== lastDate) {
            result.push({ type: "DATE", data: getDateLabel(msg.createdAt) })
            lastDate = msgDate
        }

        result.push({ type: "MESSAGE", data: msg })
    })

    return result
}
export default addDateSeparators