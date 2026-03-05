import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Newspaper, Users, MessageCircle, User, LogOut } from "lucide-react"
import SideNavbarButton from './SideNavbarButton'

const navItems = [
    { route: "feed", icon: Newspaper },
    { route: "messages", icon: MessageCircle },
    { route: "people", icon: Users },
    { route: "profile", icon: User },
    { route: "logout", icon: LogOut }
]

const SideNavbar = () => {
    const user = useSelector(store => store.user)

    return (
        <div className='h-screen w-screen bg-zinc-200'>
            <div className="fixed left-0 z-40 w-20 h-screen py-4 flex flex-col items-center gap-6">

                <NavLink to="/profile">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat`}
                        style={{ backgroundImage: `url(${user?.pfp})` }}></div>
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