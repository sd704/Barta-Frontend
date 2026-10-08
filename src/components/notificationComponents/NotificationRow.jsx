import NotifRowCard from "./NotifRowCard"
import NotifRowConnectionRequest from "./NotifRowConnectionRequest"
import NotifRowConnectionAccepted from "./NotifRowConnectionAccepted"
import NotifRowJourneyEntry from "./NotifRowJourneyEntry"
import NotifRowPostComment from "./NotifRowPostComment"
import NotifRowCommentReply from "./NotifRowCommentReply"
import NotifRowPostLikes from "./NotifRowPostLikes"
import NotifRowJourneyFollowed from "./NotifRowJourneyFollowed"
import NotifRowJournalComment from "./NotifRowJournalComment"
import NotifRowMention from "./NotifRowMention"

const NotificationRow = ({ n, onRead, }) => {
    return (
        <NotifRowCard unread={n.unread} onClick={() => n.unread && onRead(n.id)}>
            {n.type === "connection_request" && <NotifRowConnectionRequest n={n} />}
            {n.type === "connection_accepted" && <NotifRowConnectionAccepted n={n} />}
            {n.type === "journey_entry" && <NotifRowJourneyEntry n={n} />}
            {n.type === "post_comment" && <NotifRowPostComment n={n} />}
            {n.type === "comment_reply" && <NotifRowCommentReply n={n} />}
            {n.type === "post_likes" && <NotifRowPostLikes n={n} />}
            {n.type === "journey_followed" && <NotifRowJourneyFollowed n={n} />}
            {n.type === "journal_comment" && <NotifRowJournalComment n={n} />}
            {n.type === "mention" && <NotifRowMention n={n} />}
        </NotifRowCard>
    )
}

export default NotificationRow