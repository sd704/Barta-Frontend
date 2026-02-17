import { useDispatch, useSelector } from "react-redux"
import { motion } from "motion/react"
import { Hourglass, UserPlus, X, UserMinus, Undo2 } from "lucide-react"
import TactileButton from "./TactileButton"
import { CONNECT_URL, IGNORE_URL, ACCEPT_URL, REJECT_URL, WITHDRAW_URL, REMOVE_URL, BLOCK_URL, UNBLOCK_URL, DISCOVER_URL, RECEIVED_URL, PENDING_URL, CONNECTED_URL, BLOCKED_URL } from "../utils/ApiRoutes"
import { updateDiscover, updateReceived, updatePending, updateConnected, updateBlocked } from "../redux/connectionSlice"

const UserCard = ({ mode, userObj }) => {
    const connectionStore = useSelector(store => store.connection)
    const dispatch = useDispatch()

    const id = userObj._id
    const name = userObj.firstName + " " + userObj.lastName
    const handle = userObj.email
    const avatar = userObj.pfp
    const bio = userObj.about

    const endpoints = {
        discover: { filter: "discover", url: DISCOVER_URL, reducer: updateDiscover },
        received: { filter: "received", url: RECEIVED_URL, reducer: updateReceived },
        pending: { filter: "pending", url: PENDING_URL, reducer: updatePending },
        connected: { filter: "connected", url: CONNECTED_URL, reducer: updateConnected },
        blocked: { filter: "blocked", url: BLOCKED_URL, reducer: updateBlocked },
    }

    const handleUpdate = async (URL) => {
        try {
            const res = await fetch(URL, {
                method: "GET",
                headers: { "Content-Type": "application/json", },
                credentials: "include"
            })
            const data = await res.json()
            return data?.data
        } catch (err) {
            console.error(err)
            return null
        }
    }

    const handleRequest = async (URL, removeFromArr, addToArr) => {
        try {
            const res = await fetch(URL(id), {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                credentials: "include"
            })

            const data = await res.json()
            // console.log(data?.data)

            if (!res.ok) {
                console.error(data?.message)
                return
            }

            for (const item of removeFromArr) {
                const updatedData = connectionStore[item.filter].filter(obj => obj._id !== id)
                dispatch(item.reducer(updatedData))
            }

            for (const item of addToArr) {
                const updatedData = [...connectionStore[item.filter], userObj]
                dispatch(item.reducer(updatedData))
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-zinc-200 rounded-2xl p-5 flex items-center gap-4 group"
            style={{ boxShadow: "6px 6px 12px #b8b8b8, -6px -6px 12px #f5f5f5" }}
        >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                style={{ boxShadow: "inset 3px 3px 6px #b8b8b8, inset -3px -3px 6px #f5f5f5" }}
            >
                <img src={avatar} alt={name} className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-zinc-900 text-sm truncate">{name}</h3>
                <p className="text-zinc-500 text-xs font-mono">@{handle?.split("@")[0]}</p>
                <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{bio}</p>
            </div>

            <div className="flex gap-2 shrink-0">

                {/* DISCOVER */}
                {mode === 0 && (
                    <>
                        <TactileButton onClick={() => handleRequest(CONNECT_URL, [endpoints.discover], [endpoints.pending])}
                            variant="primary" icon={<UserPlus size={16} />} label="Connect" />
                        <TactileButton onClick={() => handleRequest(IGNORE_URL, [endpoints.discover], [])}
                            variant="muted" icon={<X size={16} />} label="Ignore" />
                    </>
                )}

                {/* RECEIVED */}
                {mode === 1 && (
                    <>
                        <TactileButton onClick={() => handleRequest(ACCEPT_URL, [endpoints.received], [endpoints.connected])}
                            variant="primary" icon={<UserPlus size={16} />} label="Accept" />
                        <TactileButton onClick={() => handleRequest(REJECT_URL, [endpoints.received], [])}
                            variant="muted" icon={<X size={16} />} label="Reject" />
                    </>
                )}

                {/* PENDING */}
                {mode === 2 && (
                    <TactileButton onClick={() => handleRequest(WITHDRAW_URL, [endpoints.pending], [endpoints.discover])}
                        variant="muted" icon={<Hourglass size={16} />} label="Withdraw" />
                )}

                {/* CONNECTED */}
                {mode === 3 && (
                    <TactileButton onClick={() => handleRequest(REMOVE_URL, [endpoints.connected], [endpoints.discover])}
                        variant="muted" icon={<UserMinus size={16} />} label="Remove" />
                )}

                {/* BLOCKED */}
                {mode === 4 && (
                    <TactileButton onClick={() => handleRequest(UNBLOCK_URL, [endpoints.blocked], [])}
                        variant="muted" icon={<Undo2 size={16} />} label="Unblock" />
                )}
            </div>
        </motion.div>
    )
}

export default UserCard