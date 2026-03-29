import io from "socket.io-client"
import { BASE_URL } from "./ApiRoutes"

let socket = null

export const getSocket = () => {
    if (!socket) {
        if (location.hostname === "localhost") {
            socket = io('http://localhost:7000')
        } else {
            socket = io('/', { path: "/api/socket.io" })
        }
    }
    return socket
}