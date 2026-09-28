import { Navigate, Outlet } from "react-router-dom"
import { useGetLoggedInUserQuery } from "../redux/api/userApi"

const PublicRoute = ({ children }) => {
    const { data: loggedInUser, isLoading } = useGetLoggedInUserQuery()
    if (isLoading) return null

    if (loggedInUser?._id) {
        return <Navigate to="/messages" replace />
    }

    // return children
    return <Outlet />
}

export default PublicRoute