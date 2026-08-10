// BASE API
export const BASE_URL = "http://localhost:7000/api"

// AUTH API
export const LOGIN = () => ({ url: `/auth/login`, method: 'POST' })
export const SIGNUP = () => ({ url: `/users`, method: 'POST' })
export const GET_USER = () => ({ url: `/users`, method: 'GET' })
export const UPDATE_USER = () => ({ url: `/users`, method: 'PATCH' })
export const LOGOUT = () => ({ url: `/auth/logout`, method: 'POST' })

// GET CONNECTIONS API -> requestType: GET
export const DISCOVER = () => ({ url: `/connections/feed`, method: 'GET' })
export const RECEIVED = () => ({ url: `/connections/received`, method: 'GET' })
export const PENDING = () => ({ url: `/connections/sent`, method: 'GET' })
export const CONNECTED = () => ({ url: `/connections/accepted`, method: 'GET' })
export const BLOCKED = () => ({ url: `/connections/blocked`, method: 'GET' })

// SEND REQUESTS API
export const CONNECT = (uid) => ({ url: `/requests/${uid}/interested`, method: 'POST' })
export const IGNORE = (uid) => ({ url: `/requests/${uid}/ignored`, method: 'POST' })
export const ACCEPT = (uid) => ({ url: `/requests/${uid}/accepted`, method: 'PATCH' })
export const REJECT = (uid) => ({ url: `/requests/${uid}/rejected`, method: 'PATCH' })
export const WITHDRAW = (uid) => ({ url: `/requests/${uid}/withdraw`, method: 'DELETE' })
export const REMOVE = (uid) => ({ url: `/requests/${uid}/remove`, method: 'DELETE' })
export const BLOCK = (uid) => ({ url: `/blocks/${uid}`, method: 'POST' })
export const UNBLOCK = (uid) => ({ url: `/blocks/${uid}`, method: 'DELETE' })

// SEARCH
export const GET_USER_BY_ID = (uid) => ({ url: `/search/id?id=${uid}`, method: 'GET' })

// CHAT
export const GET_CHATS = (uid) => ({ url: `/chats/${uid}`, method: 'GET' })
export const GET_ALL_CHATS = () => ({ url: `/chats`, method: 'GET' })

