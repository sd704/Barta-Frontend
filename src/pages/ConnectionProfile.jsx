import { useState } from 'react'
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Grid, List, Settings, Heart, MessageCircle, Users, User, Info } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import useFetchProfile from '../hooks/useFetchProfile'
import handleRequest from "../utils/handleRequest"
import StatsCard from '../components/StatsCard'
import ProfileHeaderButton from '../components/ProfileHeaderButton'
import ListGridButton from '../components/ListGridButton'
import POSTDATA from "../utils/dummyPosts"
import PostCard from '../components/PostCard'
import UserNotFound from './UserNotFound'
import LoadingDots from '../components/LoadingDots'

const getStatusButtonText = (person, loggedUser) => {
    if (!person?.connectionData) return ""

    const { status, isBlocked, senderId } = person.connectionData

    if (isBlocked) return "Blocked"
    if (status === "interested") return senderId === loggedUser?._id ? "Pending" : "Accept"
    if (status === "accepted") return "Connected"
    return "Connect"
}

const ConnectionProfile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [activeTab, setActiveTab] = useState('grid')
    const dispatch = useDispatch()

    const loggedUser = useSelector(store => store.user)
    const people = useSelector(store => store.people)
    const { uid } = useParams()
    const person = people?.[uid]
    const name = person ? `${person.firstName} ${person.lastName}` : ""
    const pfp = person?.pfp
    const about = person?.about
    const description = person?.description
    const statusButtonText = getStatusButtonText(person, loggedUser)
    const isAccent = ["Connect", "Accept"].includes(statusButtonText)

    useFetchProfile(uid, setLoading, setNotFound)

    if (uid === loggedUser?._id) {
        return <Navigate to="/profile" replace />
    }

    if (loading) return (<LoadingDots />)
    if (notFound) return (<UserNotFound />)
    return (
        <div className="h-screen p-6 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-6xl mx-auto">


                {/* Header Section */}
                <div className="bg-zinc-200 rounded-3xl p-8 mb-8" style={{ boxShadow: "12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.8)" }}>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

                        {/* Profile Picture */}
                        <div className={`w-32 h-32 rounded-full overflow-hidden ring-4 ring-zinc-200 ${pfp ? "" : "flex items-center justify-center text-zinc-200 bg-zinc-900"}`}
                            style={{ boxShadow: "8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(60,60,60,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)" }}>
                            {pfp && <img className="w-full h-full object-cover" alt="Profile" src={`${pfp}`} />}
                            {!pfp && <User size={60} />}
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-zinc-900 mb-1 font-mono">{name}</h1>
                                    <p className="text-zinc-500 text-sm font-mono">{about}</p>
                                </div>

                                {/* Profile Header Top Right Corner Buttons */}
                                <div className="flex gap-3">
                                    <ProfileHeaderButton variant={isAccent ? 'accent' : 'default'} onClickAction={() => {
                                        if (isAccent) { handleRequest(null, person, statusButtonText.toLowerCase(), dispatch) }
                                    }}>
                                        {statusButtonText}
                                    </ProfileHeaderButton>

                                    <ProfileHeaderButton variant='default' onClickAction={() => { }}>
                                        <MessageCircle size={18} />
                                        {/* Chat */}
                                    </ProfileHeaderButton>

                                    <ProfileHeaderButton variant='default' onClickAction={() => { navigate(location.pathname + "/info") }}>
                                        <Info size={18} />
                                    </ProfileHeaderButton>
                                </div>
                            </div>

                            {/* leading-relaxed is a Tailwind CSS utility class that sets the CSS line-height property to 1.625 (162.5% of the font size) */}
                            <p className="text-zinc-700 mb-6 max-w-2xl leading-relaxed whitespace-pre-line">
                                {description}
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <StatsCard label="Posts" value="156" />
                                <StatsCard label="Followers" value="12400" />
                                <StatsCard label="Following" value="324" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-4 mb-8">
                    <ListGridButton icon={Grid} label="Grid" isActive={activeTab === 'grid'} onClick={() => setActiveTab('grid')} />
                    <ListGridButton icon={List} label="List" isActive={activeTab === 'list'} onClick={() => setActiveTab('list')} />

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Quick Actions */}
                    <div className="bg-zinc-200 rounded-xl px-4 py-2 shadow-[6px_6px_12px_#c5c5c8,-6px_-6px_12px_#ffffff] flex items-center gap-4 font-mono text-sm text-zinc-500">
                        <button className="flex items-center gap-2 hover:text-orange-600 transition-colors"><Heart size={16} /><span>Liked</span></button>
                        <div className="w-px h-4 bg-[#c5c5c8]" />
                        <button className="flex items-center gap-2 hover:text-orange-600 transition-colors"><Users size={16} /><span>Tagged</span></button>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {POSTDATA.map((post) => (
                        <PostCard key={post.id} imageUrl={post.imageUrl} likes={post.likes} comments={post.comments} date="10 Nov, 2025" />
                    ))}
                </div>



            </div>

        </div >
    )
}

export default ConnectionProfile