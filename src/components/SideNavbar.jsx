import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { Newspaper, Users, MessageCircle, User, LogOut } from "lucide-react"
import SideNavbarButton from './SideNavbarButton'

const SideNavbar = ({ children }) => {
    const [page, setPage] = useState("messages")
    const navigate = useNavigate()
    const handleClick = (route) => {
        setPage(route)
        navigate('/' + route)  // Or navigate(-1) for back, navigate(1) for forward
    }

    return (
        <>
            <div className="fixed left-0 z-40 w-20 h-screen py-4 flex flex-col items-center gap-6">

                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat bg-[url('https://www.fomostore.in/cdn/shop/files/BISTAM375_1_819d72f0-fb42-459e-8eec-2d70e9888a19.jpg')]"
                    onClick={() => { handleClick('profile') }}></div>

                <div className="h-px w-full bg-white"></div>
                <SideNavbarButton icon={Newspaper} isActive={page == "feed"} onClick={() => { handleClick('feed') }} />
                <SideNavbarButton icon={MessageCircle} isActive={page == "messages"} onClick={() => { handleClick('messages') }} />
                <SideNavbarButton icon={Users} isActive={page == "connections"} onClick={() => { handleClick('connections') }} />
                <SideNavbarButton icon={User} isActive={page == "profile"} onClick={() => { handleClick('profile') }} />
                <SideNavbarButton icon={LogOut} isActive={page == "logout"} onClick={() => { handleClick('logout') }} />
            </div >

            {children}
        </>
    )
}

export default SideNavbar