import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import TactileButton from "./TactileButton"
import { CONNECTION_ACTIONS, CONNECTION_TABS } from "../utils/connectionConfig"

const UserCard = ({ activeTab, userObj, connectionActions }) => {
    const navigate = useNavigate()

    const id = userObj._id
    const name = userObj.name
    const handle = '@' + userObj.email?.split("@")[0]
    const pfp = userObj.pfp
    const about = userObj.about
    const variants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    const { sendRequest, isLoading } = connectionActions

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
                {pfp && <img src={pfp} alt={name} className="w-full h-full object-cover" />}
                {!pfp && <User />}

            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-zinc-900 group-hover:text-orange-600 text-sm truncate">{name}</h3>
                <p className="text-zinc-500 text-xs font-mono">{handle}</p>
                {about && <p className="text-zinc-500 text-xs font-mono mt-1 line-clamp-1">{about}</p>}
            </div>

            <div className="flex gap-2 shrink-0">
                <>
                    {CONNECTION_TABS[activeTab].actions.map(a => {
                        const action = CONNECTION_ACTIONS[a]
                        return <TactileButton
                            key={a}
                            label={action.label}
                            icon={<action.icon size={16} />}
                            variant={action.variant}
                            disabled={isLoading(id)}
                            onClick={(e) => sendRequest(e, userObj, action)}
                        />
                    })}
                </>
            </div>
        </motion.div>
    )
}

export default UserCard