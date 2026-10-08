import NotifRowCardFirstLine from "./NotifRowCardFirstLine";
import { ArrowUpRight } from "lucide-react";
import Avatar from "./Avatar";
import UserAndAction from "./UserAndAction";

const NotifRowJourneyEntry = ({ n }) => {
    return (
        <div>
            <NotifRowCardFirstLine icon={<ArrowUpRight className="h-3 w-3" />} label={`Journey · ${n.journeyTitle}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <UserAndAction p={n.from} action="added a new entry to a journey you follow." />
                    <div className="mt-4 flex gap-4 overflow-hidden rounded-xl border border-[#DCD7CF] bg-[#FDFAF4]/60">
                        <img src={n.cover} alt="" className="h-24 w-28 shrink-0 object-cover sm:h-28 sm:w-32" />
                        <div className="min-w-0 flex-1 py-3 pr-4">
                            <p className="font-serif text-[18px] leading-snug text-[#201914]">{n.entryTitle}</p>
                            <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-[#6B6159]">{n.entryExcerpt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifRowJourneyEntry