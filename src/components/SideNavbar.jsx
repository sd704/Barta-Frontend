import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Newspaper, Users, MessageCircle, User, LogOut } from "lucide-react"
import SideNavbarButton from './SideNavbarButton'
import { getSocket } from "../utils/socket"
import { addMsg } from "../redux/messageSlice"

const navItems = [
    { route: "feed", icon: Newspaper },
    { route: "messages", icon: MessageCircle },
    { route: "people", icon: Users },
    { route: "profile", icon: User },
    { route: "logout", icon: LogOut }
]

const SideNavbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const loggedInUserId = user?._id
    const pfp = user?.pfp

    useEffect(() => {
        if (!loggedInUserId) { return }

        const socket = getSocket()
        socket.emit("joinRoom")

        // Receiving msg from server
        socket.on("messageReceived", ({ chatId, lastMessage, receiver }) => {
            dispatch(addMsg({ chatId, lastMessage, receiver }))
        })

        socket.on("connect_error", (err) => {
            console.log(err) // "INVALID_TOKEN"
        })

        // When component unloads, disconnect socket
        return () => { socket.disconnect() }
    }, [loggedInUserId])

    return (
        <div className='h-screen w-screen bg-zinc-200'
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}>

            <div className="fixed left-0 z-40 w-20 h-screen py-4 flex flex-col items-center gap-6">

                <NavLink to="/profile">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-full overflow-hidden ${pfp ? "" : "text-zinc-200 bg-zinc-900"}`}
                        style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3)" }}>
                        {pfp && <img className="w-full h-full object-cover" alt="Profile" src={`${pfp}`} />}
                        {!pfp && <User />}
                    </div>
                </NavLink>

                {/* <div className="h-px w-full bg-white"></div> */}

                {navItems.map(i => <NavLink key={i.route} to={`/${i.route}`}>
                    {({ isActive }) => (
                        <SideNavbarButton icon={i.icon} isActive={isActive} />
                    )}
                </NavLink>)}
            </div >

            <Outlet />
        </div>
    )
}

export default SideNavbar