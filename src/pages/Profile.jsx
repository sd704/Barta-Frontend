import { useState } from 'react'
import { Grid, List, Settings, Heart, MessageCircle, Users } from 'lucide-react'
import { motion } from "motion/react"
import StatsCard from '../components/StatsCard'
import ProfileHeaderButton from '../components/ProfileHeaderButton'
import ListGridButton from '../components/ListGridButton'
import dummyPosts from "../utils/dummyPosts"
import PostCard from '../components/PostCard'

const Profile = () => {
    const [activeTab, setActiveTab] = useState('grid');
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div className="h-screen bg-zinc-200 p-6 md:p-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-6xl mx-auto">


                {/* Header Section */}
                <div className="bg-zinc-200 rounded-3xl p-8 mb-8" style={{ boxShadow: "12px 12px 24px rgba(0,0,0,0.2), -12px -12px 24px rgba(255,255,255,0.8)" }}>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

                        {/* Profile Picture */}
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-zinc-200" style={{ boxShadow: "inset 6px 6px 12px rgba(0,0,0,0.15), inset -6px -6px 12px rgba(255,255,255,0.7)" }}>
                            <img className="w-full h-full object-cover" alt="Profile"
                                src="https://www.fomostore.in/cdn/shop/files/BISTAM375_1_819d72f0-fb42-459e-8eec-2d70e9888a19.jpg"
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-zinc-900 mb-1 font-mono">alex_design</h1>
                                    <p className="text-zinc-500 text-sm font-mono">Digital Creator & Visual Artist</p>
                                </div>

                                {/* Profile Header Top Right Corner Buttons */}
                                <div className="flex gap-3">
                                    <ProfileHeaderButton variant={!isFollowing ? 'accent' : 'default'} onClickAction={() => setIsFollowing(!isFollowing)}>
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </ProfileHeaderButton>

                                    <ProfileHeaderButton variant='default' onClickAction={() => setIsFollowing(!isFollowing)}>
                                        <MessageCircle size={18} />
                                    </ProfileHeaderButton>

                                    <ProfileHeaderButton variant='default' onClickAction={() => setIsFollowing(!isFollowing)}>
                                        <Settings size={18} />
                                    </ProfileHeaderButton>
                                </div>
                            </div>

                            {/* leading-relaxed is a Tailwind CSS utility class that sets the CSS line-height property to 1.625 (162.5% of the font size) */}
                            <p className="text-zinc-700 mb-6 max-w-2xl leading-relaxed">
                                Exploring the intersection of design, technology, and minimalism.
                                Based in Stockholm. Available for collaborations.
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
                        <button className="flex items-center gap-2 hover:text-orange-500 transition-colors"><Heart size={16} /><span>Liked</span></button>
                        <div className="w-px h-4 bg-[#c5c5c8]" />
                        <button className="flex items-center gap-2 hover:text-orange-500 transition-colors"><Users size={16} /><span>Tagged</span></button>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyPosts.map((post) => (
                        <PostCard key={post.id} imageUrl={post.imageUrl} likes={post.likes} comments={post.comments} date="10 Nov, 2025" />
                    ))}
                </div>



            </div>

        </div >
    )
}

export default Profile