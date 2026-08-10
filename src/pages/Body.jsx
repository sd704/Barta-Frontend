import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useGetLoggedInUserQuery } from "../redux/api/userApi"
import SideNavbar from "../components/SideNavbar"
import ProtectedRoute from "../components/ProtectedRoute"
import PublicRoute from "../components/PublicRoute"
import Login from "./Login"
import Messages from "./Messages"
import Chat from "./Chat"
import Notifications from "./Notifications"
import Connections from "./Connections"
import ConnectionProfile from "./ConnectionProfile"
import ConnectionProfileInfo from "./ConnectionProfileInfo"
import Profile from "./Profile"
import ProfileInfo from "./ProfileInfo"
import Logout from "./Logout"
import NotFound from "./NotFound"

const appRouter = createBrowserRouter([
  {
    path: "auth",
    element: <PublicRoute><Login /></PublicRoute>,
  }, {
    element: <ProtectedRoute><SideNavbar /></ProtectedRoute>,
    children: [
      { path: "feed", element: "FEED" },
      { path: "journal", element: "JOURNAL" },
      {
        path: "messages",
        element: <Messages />, //messages
        children: [
          { path: ":uid", element: <Chat /> } //messages/john.doe
        ]
      },
      { path: "notification", element: <Notifications /> },
      {
        path: "people",
        children: [
          { index: true, element: <Connections /> },  //connections
          {
            path: ":uid",
            children: [
              { index: true, element: <ConnectionProfile /> },  //connections/john.doe
              { path: "info", element: <ConnectionProfileInfo /> } //connections/john.doe/info
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

const Body = () => {
  const { isLoading } = useGetLoggedInUserQuery()

  let content = null

  if (isLoading) {
    // Preventing Auth hydration race condition
    content = <div
      className='h-screen w-screen bg-zinc-200'
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
    />
  } else {
    content = <RouterProvider router={appRouter} />
  }

  return content
}

export default Body