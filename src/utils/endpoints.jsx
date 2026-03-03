import { CONNECT, IGNORE, ACCEPT, REJECT, WITHDRAW, REMOVE, BLOCK, UNBLOCK, DISCOVER_URL, RECEIVED_URL, PENDING_URL, CONNECTED_URL, BLOCKED_URL } from "../utils/ApiRoutes"

const store = {
    discover: { filter: "discover", url: DISCOVER_URL },
    received: { filter: "received", url: RECEIVED_URL },
    pending: { filter: "pending", url: PENDING_URL },
    connected: { filter: "connected", url: CONNECTED_URL },
    blocked: { filter: "blocked", url: BLOCKED_URL },
}

const endpoints = {
    connect: { route: CONNECT, removeFrom: store.discover, addTo: store.pending },
    ignore: { route: IGNORE, removeFrom: store.discover, addTo: null },
    accept: { route: ACCEPT, removeFrom: store.received, addTo: store.connected },
    reject: { route: REJECT, removeFrom: store.received, addTo: null },
    withdraw: { route: WITHDRAW, removeFrom: store.pending, addTo: store.discover },
    remove: { route: REMOVE, removeFrom: store.connected, addTo: store.discover },
    block: { route: BLOCK, removeFrom: store.connected, addTo: store.blocked },
    unblock: { route: UNBLOCK, removeFrom: store.blocked, addTo: null },
}

export default endpoints