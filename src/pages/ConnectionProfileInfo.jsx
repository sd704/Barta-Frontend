import { useState } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from "../redux/api/userApi"
import UserNotFound from './UserNotFound'
import LoadingDots from '../components/LoadingDots'
import ProfileInfoUI from "./ProfileInfoUI"

const ConnectionProfileInfo = () => {

  const loggedUser = useSelector(store => store.user)
  const people = useSelector(store => store.people)
  const { uid } = useParams()
  const person = people?.[uid]

  const { isLoading, isError, isSuccess } = useGetUserByIdQuery(uid, {
    skip: (!uid || !loggedUser) || (uid === loggedUser?._id) || (!!person)
  })
  const loading = !person && isLoading
  const notFound = isError || (isSuccess && !person)

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