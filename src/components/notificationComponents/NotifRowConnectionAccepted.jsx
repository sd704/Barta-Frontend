import NotifRowCardFirstLine from "./NotifRowCardFirstLine";
import { Users } from "lucide-react";
import Avatar from "./Avatar";
import UserAndAction from "./UserAndAction";

const NotifRowConnectionAccepted = ({ n }) => {
    return (
        <div>
            <NotifRowCardFirstLine icon={<Users className="h-3 w-3" />} label="Now connected" timestamp={n.timestamp} />
            <div className="mt-4 flex items-center gap-4">
                <Avatar p={n.from} />
                <UserAndAction p={n.from} action="accepted your connection. Say hello when you have a moment." />
            </div>
        </div>
    )
}

export default NotifRowConnectionAccepted