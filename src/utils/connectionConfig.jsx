import { UserPlus, UserMinus, UserX, Hourglass, Undo2, Ban, X, } from "lucide-react"

export const CONNECTION_ACTIONS = {
    connect: {
        type: "connect", label: "Connect", icon: UserPlus, variant: "primary",
        toast: {
            success: (name) => `Request sent to ${name}`,
            error: "Failed to send request!"
        }
    },
    ignore: {
        type: "ignore", label: "Ignore", icon: X, variant: "muted",
        toast: {
            success: (name) => `Ignored ${name}`,
            error: ""
        }
    },
    accept: {
        type: "accept", label: "Accept", icon: UserPlus, variant: "primary",
        toast: {
            success: (name) => `You're now connected to ${name}`,
            error: "Failed to accept request!"
        }
    },
    reject: {
        type: "reject", label: "Reject", icon: UserX, variant: "muted",
        toast: {
            success: (name) => `Connection request from ${name} rejected`,
            error: "Failed to reject request!"
        }
    },
    withdraw: {
        type: "withdraw", label: "Withdraw", icon: Hourglass, variant: "muted",
        toast: {
            success: (name) => `Connection request to ${name} withdrawn`,
            error: "Failed to withdraw request!"
        }
    },
    remove: {
        type: "remove", label: "Remove", icon: UserMinus, variant: "muted",
        toast: {
            success: (name) => `Removed ${name} from your connections`,
            error: "Failed to remove connection!"
        }
    },
    block: {
        type: "block", label: "Block", icon: Ban, variant: "muted",
        toast: {
            success: (name) => `${name} blocked successfully`,
            error: "Failed to block user!"
        }
    },
    unblock: {
        type: "unblock", label: "Unblock", icon: Undo2, variant: "muted",
        toast: {
            success: (name) => `${name} un-blocked successfully`,
            error: "Failed to unblock user!"
        }
    }
}

export const CONNECTION_TABS = {
    discover: {
        label: "DISCOVER",
        actions: ["connect", "ignore"],
        filter: (user, myUid) => ([null, '', 'withdraw', 'rejected', 'remove'].includes(user.connectionData.status) && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: null, senderId: null, blockedByMe: false, blockedMe: false } }
    },
    received: {
        label: "RECEIVED",
        actions: ["accept", "reject"],
        filter: (user, myUid) => (user.connectionData.status === 'interested' && user.connectionData.senderId !== myUid && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: 'interested', senderId: user._id, blockedByMe: false, blockedMe: false } }
    },
    pending: {
        label: "PENDING",
        actions: ["withdraw"],
        filter: (user, myUid) => (user.connectionData.status === 'interested' && user.connectionData.senderId === myUid && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: 'interested', senderId: myUid, blockedByMe: false, blockedMe: false } }
    },
    connected: {
        label: "CONNECTED",
        actions: ["remove", "block"],
        filter: (user, myUid) => (user.connectionData.status === 'accepted' && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: 'accepted', senderId: null, blockedByMe: false, blockedMe: false } }
    },
    blocked: {
        label: "BLOCKED",
        actions: ["unblock"],
        filter: (user, myUid) => (user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: null, senderId: null, blockedByMe: true, blockedMe: false } }
    }
}

// CONNECTION_TABS -> filter() to identify which tab the user belongs to from mixed list