import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../redux/userSlice";
import { GET_USER_URL } from "../utils/ApiRoutes"
import Connections from "./Connections"
import Login from "./Login"
import Messages from "./Messages"
import Profile from "./Profile"
import SideNavbar from "../components/SideNavbar"
import ProtectedRoute from "../components/ProtectedRoute"
import PublicRoute from "../components/PublicRoute"

const Body = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  const appRouter = createBrowserRouter([
    {
      path: "/auth",
      element: <PublicRoute><Login /></PublicRoute>,
    }, {
      element: <ProtectedRoute><SideNavbar /></ProtectedRoute>,
      children: [
        { path: "/feed", element: "FEED" },
        { path: "/messages", element: <Messages /> },
        { path: "/connections", element: <Connections /> },
        { path: "/profile", element: <Profile /> },
        { path: "/logout", element: "LOGOUT" }
      ]
    }
  ])

  const fetchUser = async () => {
    const res = await fetch(GET_USER_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", },
      credentials: "include"
    })
    const data = await res.json()
    dispatch(addUser(data?.data))
  }

  useEffect(() => {
    try {
      if (user) return
      fetchUser()
    } catch (err) {
      // console.error(err)
    }
  }, [])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default Body