import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Newspaper, NotebookPen, Users, MessageCircle, Bell, User, LogOut } from "lucide-react"
import SideNavbarButton from './SideNavbarButton'
import useSocket from '../hooks/useSocket'

const navItems = [
    { route: "feed", icon: Newspaper, label: "Feed" },
    { route: "journal", icon: NotebookPen, label: "Journal" },
    { route: "messages", icon: MessageCircle, label: "Messages" },
    { route: "notification", icon: Bell, label: "Notifications" },
    { route: "people", icon: Users, label: "People" },
    { route: "profile", icon: User, label: "Profile" },
    { route: "logout", icon: LogOut, label: "Logout" },
]

const SideNavbar = () => {
    const user = useSelector(store => store.user)
    const loggedInUserId = user?._id
    const pfp = user?.pfp

    useSocket(loggedInUserId)

    return (
        <div className='h-screen w-screen bg-zinc-200'
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}>

            <div className="fixed left-0 z-40 w-20 h-screen py-4 flex flex-col items-center gap-6">

                <NavLink to="/profile" aria-label="Profile Picture">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-full overflow-hidden ${pfp ? "" : "text-zinc-200 bg-zinc-900"}`}
                        style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3)" }}>
                        {pfp && <img className="w-full h-full object-cover" alt="Profile" src={`${pfp}`} />}
                        {!pfp && <User />}
                    </div>
                </NavLink>

                {/* <div className="h-px w-full bg-white"></div> */}

                {navItems.map(i => <NavLink key={i.route} to={`/${i.route}`} aria-label={i.label}>
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