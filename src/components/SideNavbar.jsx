import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useState } from "react"
import { Newspaper, Users, MessageCircle, User, LogOut } from "lucide-react"
import SideNavbarButton from './SideNavbarButton'

const SideNavbar = () => {
    const location = useLocation();
    const user = useSelector(store => store.user)
    const [page, setPage] = useState(location.pathname.split("/")[1])
    const navigate = useNavigate()
    const handleClick = (route) => {
        setPage(route)
        navigate('/' + route)  // Or navigate(-1) for back, navigate(1) for forward
    }

    return (
        <div className='h-screen w-screen bg-zinc-200'>
            <div className="fixed left-0 z-40 w-20 h-screen py-4 flex flex-col items-center gap-6">

                <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat`}
                    style={{ backgroundImage: `url(${user?.pfp})` }}
                    onClick={() => { handleClick('profile') }}></div>

                {/* <div className="h-px w-full bg-white"></div> */}
                <SideNavbarButton icon={Newspaper} isActive={page == "feed"} onClick={() => { handleClick('feed') }} />
                <SideNavbarButton icon={MessageCircle} isActive={page == "messages"} onClick={() => { handleClick('messages') }} />
                <SideNavbarButton icon={Users} isActive={page == "connections"} onClick={() => { handleClick('connections') }} />
                <SideNavbarButton icon={User} isActive={page == "profile"} onClick={() => { handleClick('profile') }} />
                <SideNavbarButton icon={LogOut} isActive={page == "logout"} onClick={() => { handleClick('logout') }} />
            </div >

            <Outlet />
        </div>
    )
}

export default SideNavbar