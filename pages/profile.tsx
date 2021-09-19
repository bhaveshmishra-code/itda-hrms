import React from 'react'
import { useSession } from 'next-auth/client'
import Loading from 'components/Loading'
import Profile from 'components/Profile'
import SignIn from 'components/SignIn'

export default function ProfilePage() {
  const [session, loading] = useSession()
  if (loading) {
    return <Loading />
  }
  if (!session) {
    return <SignIn />
  }
  // console.log(session.user)
  return <Profile user={session.user} />
}
