import NotifRowCardFirstLine from "./NotifRowCardFirstLine";
import { UserPlus } from "lucide-react";
import Avatar from "./Avatar";
import UserAndAction from "./UserAndAction";
import CustomButton from "./CustomButton";

const NotifRowConnectionRequest = ({ n }) => {
    return (
        <div>
            <NotifRowCardFirstLine icon={<UserPlus className="h-3 w-3" />} label="Connection request" timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} size={48} />
                <div className="min-w-0 flex-1">
                    <UserAndAction p={n.from} action={`would like to follow your journeys · ${n.mutuals} mutual`} />
                    {n.note && (
                        <blockquote className="mt-3 border-l-2 border-[#DCD7CF] pl-4 font-serif text-[16px] italic leading-relaxed text-[#201914]/80">
                            “{n.note}”
                        </blockquote>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                        <CustomButton size="sm" className="rounded-full bg-[#201914] text-[#FDFAF4] hover:bg-[#201914]/90">Accept</CustomButton>
                        <CustomButton size="sm" variant="ghost" className="rounded-full text-[#6B6159] hover:text-[#201914]">Later</CustomButton>
                        <CustomButton size="sm" variant="ghost" className="rounded-full text-[#6B6159] hover:text-[#201914]">View profile</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifRowConnectionRequest