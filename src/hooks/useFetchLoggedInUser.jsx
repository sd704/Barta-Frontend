import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../redux/userSlice";
import { GET_USER_URL } from "../utils/ApiRoutes"

const useFetchLoggedInUser = (setLoading) => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()

    const fetchUser = async () => {
        try {
            const res = await fetch(GET_USER_URL, {
                method: "GET",
                headers: { "Content-Type": "application/json", },
                credentials: "include"
            })
            const data = await res.json()
            dispatch(addUser(data?.data))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) return
        fetchUser()
    }, [])

}

export default useFetchLoggedInUser