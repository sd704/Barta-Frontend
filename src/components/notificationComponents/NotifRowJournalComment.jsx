import NotifRowCardFirstLine from "./NotifRowCardFirstLine"
import { MessageCircle } from "lucide-react"
import Avatar from "./Avatar"
import UserAndAction from "./UserAndAction"

const NotifRowJournalComment = ({ n }) => {
    return (
        <div>
            <NotifRowCardFirstLine icon={<MessageCircle className="h-3 w-3" />} label={`Journal · ${n.entryTitle}`} timestamp={n.timestamp} />
            <div className="mt-4 flex items-start gap-4">
                <Avatar p={n.from} />
                <div className="min-w-0 flex-1">
                    <UserAndAction p={n.from} action="left a note on your journal entry." />
                    <p className="mt-3 rounded-lg bg-[#F2EEE6]/50 px-4 py-3 text-[14px] leading-relaxed text-[#201914]/85">{n.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default NotifRowJournalComment