import React from 'react'
import EditProfileForm from './EditProfileForm'
import { getProfileQuery, QueryKey } from 'query/query'
import { useQuery } from 'react-query'
import Loading from './Loading'

export default function EditProfile({ user }) {
  const { data, isLoading } = useQuery(QueryKey.PROFILE_QUERY, () =>
    getProfileQuery(user)
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <EditProfileForm profile={data} />
    </div>
  )
}
