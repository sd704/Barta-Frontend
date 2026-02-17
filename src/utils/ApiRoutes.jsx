// BASE API
export const BASE_URL = "http://localhost:7000/api"

// AUTH API
export const LOGIN_URL = BASE_URL + "/auth/login"
export const SIGNUP_URL = BASE_URL + "/user"
export const GET_USER_URL = BASE_URL + "/user"

// GET CONNECTIONS API
export const DISCOVER_URL = BASE_URL + "/connections/feed"
export const RECEIVED_URL = BASE_URL + "/connections/interested"
export const PENDING_URL = BASE_URL + "/connections/sent"
export const CONNECTED_URL = BASE_URL + "/connections/accepted"
export const BLOCKED_URL = BASE_URL + "/connections/blocked"

// SEND REQUESTS API
export const CONNECT_URL = (uid) => BASE_URL + `/requests/interested/${uid}`
export const IGNORE_URL = (uid) => BASE_URL + `/requests/ignored/${uid}`
export const ACCEPT_URL = (uid) => BASE_URL + `/requests/accepted/${uid}`
export const REJECT_URL = (uid) => BASE_URL + `/requests/rejected/${uid}`
export const WITHDRAW_URL = (uid) => BASE_URL + `/requests/withdraw/${uid}`
export const REMOVE_URL = (uid) => BASE_URL + `/requests/remove/${uid}`
export const BLOCK_URL = (uid) => BASE_URL + `/requests/blocked/${uid}`
export const UNBLOCK_URL = (uid) => BASE_URL + `/requests/unblocked/${uid}`