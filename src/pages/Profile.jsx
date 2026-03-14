import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Grid, List, Settings, Heart, MessageCircle, ExternalLink, Users, User, Info } from 'lucide-react'
import { useSelector } from "react-redux"
import StatsCard from '../components/StatsCard'
import ProfileHeaderButton from '../components/ProfileHeaderButton'
import ListGridButton from '../components/ListGridButton'
import POSTDATA from "../utils/dummyPosts"
import PostCard from '../components/PostCard'

const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(store => store.user)
    const [activeTab, setActiveTab] = useState('grid')

    const path = location.pathname.split("/")[1]
    const name = path == "profile" ? user?.firstName + " " + user?.lastName : ""
    const pfp = path == "profile" ? user?.pfp : ""
    const about = path == "profile" ? user?.about : ""
    const description = path == "profile" ? user?.description : ""

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

                                    <ProfileHeaderButton variant='default' onClickAction={() => { navigate("/profile/info") }}>
                                        <Info size={18} />
                                        {/* Profile Info */}
                                    </ProfileHeaderButton>

                                    <ProfileHeaderButton variant='default' onClickAction={() => { }}>
                                        <Settings size={18} />
                                    </ProfileHeaderButton>

                                    <ProfileHeaderButton variant='default' onClickAction={() => { }}>
                                        <ExternalLink size={18} />
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

export default Profile