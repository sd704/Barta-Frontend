const handleUpdate = async (URL) => {
        try {
            const res = await fetch(URL, {
                method: "GET",
                headers: { "Content-Type": "application/json", },
                credentials: "include"
            })
            const data = await res.json()
            return data?.data
        } catch (err) {
            console.error(err)
            return null
        }
    }

const handleRequest = async (event, userObj, route, removeFromArr, addToArr, connectionStore, dispatch) => {

    try {
        event.stopPropagation() // To prevent parent onClick from executing
        const reqObj = route(userObj._id)
        const res = await fetch(reqObj.url, {
            method: reqObj.requestType,
            headers: { "Content-Type": "application/json", },
            credentials: "include"
        })

        const data = await res.json()
        // console.log(data?.data)

        if (!res.ok) {
            console.error(data?.message)
            return
        }

        for (const item of removeFromArr) {
            const updatedData = connectionStore[item.filter].filter(obj => obj._id !== userObj._id)
            dispatch(item.reducer(updatedData))
        }

        for (const item of addToArr) {
            const updatedData = [...connectionStore[item.filter], userObj]
            dispatch(item.reducer(updatedData))
        }
    } catch (err) {
        console.error(err)
    }
}

export default handleRequest