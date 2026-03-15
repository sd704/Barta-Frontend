import { useSelector } from "react-redux"
import ProfileInfoUI from "./ProfileInfoUI"

const ProfileInfo = () => {
    const user = useSelector(store => store.user)

    return (
        <ProfileInfoUI user={user} isEditAllowed={true} />
    )
}

export default ProfileInfo