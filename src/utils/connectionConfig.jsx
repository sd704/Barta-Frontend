import { CONNECT, IGNORE, ACCEPT, REJECT, WITHDRAW, REMOVE, BLOCK, UNBLOCK, } from "../utils/ApiRoutes"
import { UserPlus, UserMinus, UserX, Hourglass, Undo2, Ban, X, } from "lucide-react"
import { DISCOVER_URL, RECEIVED_URL, PENDING_URL, CONNECTED_URL, BLOCKED_URL } from "../utils/ApiRoutes"

export const CONNECTION_ACTIONS = {
    connect: {
        type: "connect", label: "Connect", icon: UserPlus, variant: "primary", endpoint: CONNECT,
        // removeFrom: "discover", addTo: "pending",
        toast: {
            success: "Connection request sent", error: "Failed to send request!"
        }
    },
    ignore: {
        type: "ignore", label: "Ignore", icon: X, variant: "muted", endpoint: IGNORE,
        // removeFrom: "discover", addTo: null,
        toast: {
            success: "", error: ""
        }
    },
    accept: {
        type: "accept", label: "Accept", icon: UserPlus, variant: "primary", endpoint: ACCEPT,
        // removeFrom: "received", addTo: "connected",
        toast: {
            success: "Connection request accepted", error: "Failed to accept request!"
        }
    },
    reject: {
        type: "reject", label: "Reject", icon: UserX, variant: "muted", endpoint: REJECT,
        // removeFrom: "received", addTo: null,
        toast: {
            success: "Connection request rejected", error: "Failed to reject request!"
        }
    },
    withdraw: {
        type: "withdraw", label: "Withdraw", icon: Hourglass, variant: "muted", endpoint: WITHDRAW,
        // removeFrom: "pending", addTo: "discover",
        toast: {
            success: "Connection request withdrawn", error: "Failed to withdraw request!"
        }
    },
    remove: {
        type: "remove", label: "Remove", icon: UserMinus, variant: "muted", endpoint: REMOVE,
        // removeFrom: "connected", addTo: "discover",
        toast: {
            success: "Connection removed successfully", error: "Failed to remove connection!"
        }
    },
    block: {
        type: "block", label: "Block", icon: Ban, variant: "muted", endpoint: BLOCK,
        // removeFrom: "connected", addTo: "blocked",
        toast: {
            success: "User blocked successfully", error: "Failed to block user!"
        }
    },
    unblock: {
        type: "unblock", label: "Unblock", icon: Undo2, variant: "muted", endpoint: UNBLOCK,
        // removeFrom: "blocked", addTo: null,
        toast: {
            success: "User unblocked successfully", error: "Failed to unblock user!"
        }
    }
}

export const CONNECTION_TABS = {
    discover: {
        label: "DISCOVER",
        endpoint: DISCOVER_URL,
        actions: ["connect", "ignore"],
        filter: (user, myUid) => ([null, '', 'withdraw', 'remove'].includes(user.connectionData.status) && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: null, senderId: null, blockedByMe: false, blockedMe: false } }
    },
    received: {
        label: "RECEIVED",
        endpoint: RECEIVED_URL,
        actions: ["accept", "reject"],
        filter: (user, myUid) => (user.connectionData.status === 'interested' && user.connectionData.senderId !== myUid && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: 'interested', senderId: user._id, blockedByMe: false, blockedMe: false } }
    },
    pending: {
        label: "PENDING",
        endpoint: PENDING_URL,
        actions: ["withdraw"],
        filter: (user, myUid) => (user.connectionData.status === 'interested' && user.connectionData.senderId === myUid && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: 'interested', senderId: myUid, blockedByMe: false, blockedMe: false } }
    },
    connected: {
        label: "CONNECTED",
        endpoint: CONNECTED_URL,
        actions: ["remove", "block"],
        filter: (user, myUid) => (user.connectionData.status === 'accepted' && !user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: 'accepted', senderId: null, blockedByMe: false, blockedMe: false } }
    },
    blocked: {
        label: "BLOCKED",
        endpoint: BLOCKED_URL,
        actions: ["unblock"],
        filter: (user, myUid) => (user.connectionData.blockedByMe),
        connectionData: (user, myUid) => { return { status: null, senderId: null, blockedByMe: true, blockedMe: false } }
    }
}