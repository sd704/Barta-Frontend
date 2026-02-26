import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addPerson } from "../redux/peopleSlice"
import { GET_USER_BY_ID } from "../utils/ApiRoutes"

const useFetchProfile = (uid, setLoading) => {
    const dispatch = useDispatch()
    const people = useSelector(store => store.people)

    const fetchUser = async (uid) => {
        try {
            if (people?.[uid]) return
            const res = await fetch(GET_USER_BY_ID(uid), {
                method: "GET",
                headers: { "Content-Type": "application/json", },
                credentials: "include"
            })
            const data = await res.json()
            dispatch(addPerson(data?.data))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser(uid)
    }, [])

}

export default useFetchProfile