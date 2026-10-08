import NotifRowCardFirstLine from "./NotifRowCardFirstLine";
import { Heart } from "lucide-react";

const NotifRowPostLikes = ({ n }) => {
    const visible = n.people.slice(0, 4);
    const extras = Math.max(0, n.totalCount - visible.length);
    return (
        <div>
            <NotifRowCardFirstLine icon={<Heart className="h-3 w-3 animate-heart-pulse" />} label="Appreciation" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <div className="flex -space-x-2">
                    {visible.map((p) => (
                        <img key={p.handle} src={p.avatar} alt={p.name} className="h-9 w-9 rounded-full border-2 border-[#FFFDFA] object-cover" />
                    ))}
                    {extras > 0 && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FFFDFA] bg-[#F2EEE6] font-mono text-[11px] text-[#201914]">
                            +{extras}
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-relaxed text-[#201914]">
                        <span className="font-medium">{visible[0].name}</span>
                        <span className="text-[#6B6159]">{" "}and {n.totalCount - 1} others responded to{" "}</span>
                        <span className="font-serif italic text-[#201914]">“{n.postTitle}”</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotifRowPostLikes