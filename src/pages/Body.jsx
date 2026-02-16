import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Connections from "./Connections"
import Login from "./Login"
import Messages from "./Messages"
import Profile from "./Profile"
import SideNavbar from "../components/SideNavbar"

const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/feed",
      element: <SideNavbar ></SideNavbar >,
    },
    {
      path: "/messages",
      element: <SideNavbar ><Messages /></SideNavbar >,
    },
    {
      path: "/connections",
      element: <SideNavbar ><Connections /></SideNavbar >,
    },
    {
      path: "/profile",
      element: <SideNavbar ><Profile /></SideNavbar >,
    },
    {
      path: "/logout",
      element: <SideNavbar ></SideNavbar >,
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default Body