import EditProfile from 'components/EditProfile'
import React from 'react'
import { useSession } from 'next-auth/client'
import Loading from 'components/Loading'
import SignIn from 'components/SignIn'

export default function EditProfilePage() {
  const [session, loading] = useSession()
  if (loading) {
    return <Loading />
  }
  if (!session) {
    return <SignIn />
  }
  return <EditProfile user={session.user} />
}
