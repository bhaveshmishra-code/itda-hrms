import React from 'react'
import { useSession } from 'next-auth/client'
import Loading from 'components/Loading'
import SignIn from 'components/SignIn'
import LeaveStatus from 'components/LeaveStatus'

export default function LeaveStatusPage() {
  const [session, loading] = useSession()
  if (loading) {
    return <Loading />
  }
  if (!session) {
    return <SignIn />
  }
  // console.log(session.user)
  return <LeaveStatus user={session.user} />
}
