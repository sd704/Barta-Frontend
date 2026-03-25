import io from "socket.io-client"
import { BASE_URL } from "./ApiRoutes"

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        return io('http://localhost:7000')
    }
    else {
        return io('/', { path: "/api/socket.io" })
    }
}