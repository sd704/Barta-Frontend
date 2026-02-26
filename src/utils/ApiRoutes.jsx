// BASE API
export const BASE_URL = "http://localhost:7000/api"

// AUTH API
export const LOGIN_URL = BASE_URL + "/auth/login"
export const SIGNUP_URL = BASE_URL + "/users"
export const GET_USER_URL = BASE_URL + "/users"

// GET CONNECTIONS API
export const DISCOVER_URL = BASE_URL + "/connections/feed"
export const RECEIVED_URL = BASE_URL + "/connections/received"
export const PENDING_URL = BASE_URL + "/connections/sent"
export const CONNECTED_URL = BASE_URL + "/connections/accepted"
export const BLOCKED_URL = BASE_URL + "/connections/blocked"

// SEND REQUESTS API
export const CONNECT = (uid) => ({ url: BASE_URL + `/requests/${uid}/interested`, requestType: 'POST' })
export const IGNORE = (uid) => ({ url: BASE_URL + `/requests/${uid}/ignored`, requestType: 'POST' })
export const ACCEPT = (uid) => ({ url: BASE_URL + `/requests/${uid}/accepted`, requestType: 'PATCH' })
export const REJECT = (uid) => ({ url: BASE_URL + `/requests/${uid}/rejected`, requestType: 'PATCH' })
export const WITHDRAW = (uid) => ({ url: BASE_URL + `/requests/${uid}/withdraw`, requestType: 'DELETE' })
export const REMOVE = (uid) => ({ url: BASE_URL + `/requests/${uid}/remove`, requestType: 'DELETE' })
export const BLOCK = (uid) => ({ url: BASE_URL + `/blocks/${uid}`, requestType: 'POST' })
export const UNBLOCK = (uid) => ({ url: BASE_URL + `/blocks/${uid}`, requestType: 'DELETE' })

// SEARCH
export const GET_USER_BY_ID = (uid) => BASE_URL + `/search/id?id=${uid}`