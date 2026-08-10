import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useGetLoggedInUserQuery } from "../redux/api/userApi"

const PublicRoute = ({ children }) => {
    const { data: loggedInUser, isLoading } = useGetLoggedInUserQuery()
    if (isLoading) return null

    if (loggedInUser?._id) {
        return <Navigate to="/messages" replace />
    }

    return children
}

export default PublicRoute