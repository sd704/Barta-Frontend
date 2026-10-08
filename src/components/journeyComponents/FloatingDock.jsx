import { Heart, Bookmark, Share2, MessageCircle } from "lucide-react";

const FloatingDockButton = ({ Icon, children, active, onClick, activeColor }) => {
    return (
        <button onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-zinc-200 transition-colors ${active ? activeColor : "text-[#18181b]/80"}`}>
            <Icon className="size-4" strokeWidth={2.25} fill={active ? "currentColor" : "none"} />
            {children}
        </button>
    );
}

const FloatingDock = ({ entry, liked, setLiked, saved, setSaved }) => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full bg-zinc-100 backdrop-blur shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] border border-black/8 px-2 py-1.5">
            <FloatingDockButton active={liked} onClick={() => setLiked((v) => !v)} Icon={Heart} activeColor="text-[#ff5c35]">
                <span className="font-mono text-xs tabular-nums">{entry.likes + (liked ? 1 : 0)}</span>
            </FloatingDockButton>
            <span className="h-4 w-px bg-[rgba(0, 0, 0, 0.08)]" />
            <FloatingDockButton Icon={MessageCircle}>
                <span className="font-mono text-xs tabular-nums">{entry.comments.length}</span>
            </FloatingDockButton>
            <span className="h-4 w-px bg-[rgba(0, 0, 0, 0.08)]" />
            <FloatingDockButton active={saved} onClick={() => setSaved((v) => !v)} Icon={Bookmark} activeColor="text-[#007aff]" />
            <span className="h-4 w-px bg-[rgba(0, 0, 0, 0.08)]" />
            <FloatingDockButton Icon={Share2} />
        </div>
    )
}

export default FloatingDock;