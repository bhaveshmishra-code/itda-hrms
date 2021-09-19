import Dashboard from 'components/Dashboard'
import React from 'react'
import { useSession } from 'next-auth/client'
import Loading from 'components/Loading'
import Profile from 'components/Profile'
import SignIn from 'components/SignIn'

export default function DashboardPage() {
  const [session, loading] = useSession()
  if (loading) {
    return <Loading />
  }
  if (!session) {
    return <SignIn />
  }

  // console.log(session.user)
  return <Dashboard user={session.user} />
}
