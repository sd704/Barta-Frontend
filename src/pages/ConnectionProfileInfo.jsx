import { useState } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useParams } from 'react-router-dom'
import useFetchProfile from '../hooks/useFetchProfile'
import UserNotFound from './UserNotFound'
import LoadingDots from '../components/LoadingDots'
import ProfileInfoUI from "./ProfileInfoUI"

const ConnectionProfileInfo = () => {
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const loggedUser = useSelector(store => store.user)
  const people = useSelector(store => store.people)
  const { uid } = useParams()
  const person = people?.[uid]

  useFetchProfile(uid, setLoading, setNotFound)

  if (uid === loggedUser?._id) {
    return <Navigate to="/profile/info" replace />
  }

  if (loading) return (<LoadingDots />)
  if (notFound) return (<UserNotFound />)

  return (
    <ProfileInfoUI user={person} isEditAllowed={false} />
  )
}

export default ConnectionProfileInfo