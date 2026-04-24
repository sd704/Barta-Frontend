import io from "socket.io-client"
import { BASE_URL } from "./ApiRoutes"

let socket = null

export const getSocket = () => {
    if (!socket) {

        socket = io('http://localhost:7000', {
            withCredentials: true
        })

        // if (location.hostname === "localhost") {
        //     socket = io('http://localhost:7000', {
        //         withCredentials: true
        //     })
        // } else {
        //     socket = io('/', {
        //         path: "/api/socket.io",
        //         withCredentials: true
        //     })
        // }
    }
    return socket
}

// For auth we could use auth{} but we don't have the token as it is saved in cookies
// So we allow sending cookies using withCredentials