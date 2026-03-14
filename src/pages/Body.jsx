import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useState } from "react"
import useFetchLoggedInUser from "../hooks/useFetchLoggedInUser"
import SideNavbar from "../components/SideNavbar"
import ProtectedRoute from "../components/ProtectedRoute"
import PublicRoute from "../components/PublicRoute"
import Login from "./Login"
import Messages from "./Messages"
import Connections from "./Connections"
import ConnectionProfile from "./ConnectionProfile"
import Profile from "./Profile"
import ProfileInfo from "./ProfileInfo"
import Logout from "./Logout"
import NotFound from "./NotFound"

const Body = () => {
  const [loading, setLoading] = useState(true)

  const appRouter = createBrowserRouter([
    {
      path: "auth",
      element: <PublicRoute><Login /></PublicRoute>,
    }, {
      element: <ProtectedRoute><SideNavbar /></ProtectedRoute>,
      children: [
        { path: "feed", element: "FEED" },
        { path: "messages", element: <Messages /> },
        {
          path: "people",
          children: [
            { index: true, element: <Connections /> },  //connections
            {
              path: ":uid",
              children: [
                { index: true, element: <ConnectionProfile /> },  //connections/john.doe
                { path: "info", element: <ProfileInfo /> } //connections/john.doe/info
              ]
            }
          ]
        },
        {
          path: "profile",
          children: [
            { index: true, element: <Profile /> },  //profile
            { path: "info", element: <ProfileInfo /> } //profile/info
          ]
        },
        { path: "logout", element: <Logout /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ])

  useFetchLoggedInUser(setLoading)

  // Preventing Auth hydration race condition
  if (loading) return (<div className="bg-zinc-200 h-screen w-screen"></div>)

  return (<>      <RouterProvider router={appRouter} />    </>)
}

export default Body