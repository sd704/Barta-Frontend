import NotifRowCardFirstLine from "./NotifRowCardFirstLine"
import { ArrowUpRight } from "lucide-react"
import Avatar from "./Avatar"
import UserAndAction from "./UserAndAction"

const NotifRowJourneyFollowed = ({ n }) => {
    return (
        <div>
            <NotifRowCardFirstLine icon={<ArrowUpRight className="h-3 w-3" />} label="New follower" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <UserAndAction
                        p={n.from}
                        action={
                            <>
                                started following{" "}
                                <span className="font-serif italic text-[#201914]">“{n.journeyTitle}”</span>.
                            </>
                        }
                    />

                    <div className="mt-3 inline-flex items-center gap-3 rounded-lg border border-[#DCD7CF] bg-[#FDFAF4]/60 p-2 pr-4">
                        <img src={n.cover} alt="" className="h-12 w-12 rounded-md object-cover" />
                        <span className="font-serif text-[15px] text-[#201914]">{n.journeyTitle}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifRowJourneyFollowed