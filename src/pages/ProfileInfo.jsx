import { useSelector } from "react-redux"
import ProfileInfoUI from "./ProfileInfoUI"
import { useGetLoggedInUserQuery } from "../redux/api/userApi"

const ProfileInfo = () => {
    const { data: loggedInUser } = useGetLoggedInUserQuery()

    return (
        <ProfileInfoUI user={loggedInUser} isEditAllowed={true} />
    )
}

export default ProfileInfo