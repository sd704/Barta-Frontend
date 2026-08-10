import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useGetLoggedInUserQuery, useGetUserByIdQuery } from "../redux/api/userApi"
import UserNotFound from './UserNotFound'
import LoadingDots from '../components/LoadingDots'
import ProfileInfoUI from "./ProfileInfoUI"

const ConnectionProfileInfo = () => {

  const { data: loggedInUser } = useGetLoggedInUserQuery()
  const loggedInUserId = loggedInUser?._id
  const { uid } = useParams()

  const { data: person, isLoading, isError, isSuccess, isFetching } = useGetUserByIdQuery(uid, {
    skip: (!uid || !loggedInUser) || (uid === loggedInUserId)
    // skip if uid is not available, or if the user is viewing their own profile
  })

  const loading = isLoading || (isFetching && !person)
  const notFound = isError || (isSuccess && !person)

  if (uid === loggedInUserId) {
    return <Navigate to="/profile/info" replace />
  }

  if (loading) return (<LoadingDots />)
  if (notFound) return (<UserNotFound />)

  return (
    <ProfileInfoUI user={person} isEditAllowed={false} />
  )
}

export default ConnectionProfileInfo