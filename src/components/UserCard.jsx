import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { motion } from "motion/react"
import { Hourglass, UserPlus, X, UserMinus, Undo2, UserX, Ban, User } from "lucide-react"
import TactileButton from "./TactileButton"
import handleRequest from "../utils/handleRequest"

const UserCard = ({ mode, userObj }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const id = userObj._id
    const name = userObj.firstName + " " + userObj.lastName
    const handle = '@' + userObj.email?.split("@")[0]
    const pfp = userObj.pfp
    const about = userObj.about

    const variants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

    return (
        <motion.div
            variants={variants}
            whileTap={{ scale: 0.98 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-zinc-200 rounded-2xl p-5 flex items-center gap-4 group"
            style={{ boxShadow: "6px 6px 12px #b8b8b8, -6px -6px 12px #f5f5f5" }}
            onClick={() => { navigate('/people/' + id) }}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${pfp ? "" : "text-orange-600"}`}
                style={{ boxShadow: "inset 3px 3px 6px #b8b8b8, inset -3px -3px 6px #f5f5f5" }}
            >
                {pfp && <img src={pfp} alt={name} className="w-full h-full object-cover rounded-xl" />}
                {!pfp && <User />}

            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-zinc-900 text-sm truncate">{name}</h3>
                <p className="text-zinc-500 text-xs font-mono">{handle}</p>
                {about && <p className="text-zinc-500 text-xs font-mono mt-1 line-clamp-1">{about}</p>}
            </div>

            <div className="flex gap-2 shrink-0">

                {/* DISCOVER */}
                {mode === 0 && (
                    <>
                        <TactileButton onClick={(e) => handleRequest(e, userObj, "connect", dispatch)}
                            variant="primary" icon={<UserPlus size={16} />} label="Connect" />
                        <TactileButton onClick={(e) => handleRequest(e, userObj, "ignore", dispatch)}
                            variant="muted" icon={<X size={16} />} label="Ignore" />
                    </>
                )}

                {/* RECEIVED */}
                {mode === 1 && (
                    <>
                        <TactileButton onClick={(e) => handleRequest(e, userObj, "accept", dispatch)}
                            variant="primary" icon={<UserPlus size={16} />} label="Accept" />
                        <TactileButton onClick={(e) => handleRequest(e, userObj, "reject", dispatch)}
                            variant="muted" icon={<UserX size={16} />} label="Reject" />
                    </>
                )}

                {/* PENDING */}
                {mode === 2 && (
                    <TactileButton onClick={(e) => handleRequest(e, userObj, "withdraw", dispatch)}
                        variant="muted" icon={<Hourglass size={16} />} label="Withdraw" />
                )}

                {/* CONNECTED */}
                {mode === 3 && (
                    <>
                        <TactileButton onClick={(e) => handleRequest(e, userObj, "remove", dispatch)}
                            variant="muted" icon={<UserMinus size={16} />} label="Remove" />
                        <TactileButton onClick={(e) => handleRequest(e, userObj, "block", dispatch)}
                            variant="muted" icon={<Ban size={16} />} label="Block" />
                    </>
                )}

                {/* BLOCKED */}
                {mode === 4 && (
                    <TactileButton onClick={(e) => handleRequest(e, userObj, "unblock", dispatch)}
                        variant="muted" icon={<Undo2 size={16} />} label="Unblock" />
                )}
            </div>
        </motion.div>
    )
}

export default UserCard