import NotifRowCardFirstLine from "./NotifRowCardFirstLine"
import { Quote } from "lucide-react"
import Avatar from "./Avatar"
import UserAndAction from "./UserAndAction"

const NotifRowMention = ({ n }) => {
    return (
        <div>
            <NotifRowCardFirstLine icon={<Quote className="h-3 w-3" />} label={`Mention · ${n.where}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <UserAndAction p={n.from} action="mentioned you." />
                    <blockquote className="mt-3 border-l-2 border-orange-600 pl-4 font-serif text-[16px] italic leading-relaxed text-[#201914]/85">
                        {n.excerpt}
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default NotifRowMention