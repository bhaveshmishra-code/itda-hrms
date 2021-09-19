import { useSession } from 'next-auth/client'
import SignIn from '../components/SignIn'
import LeaveStatus from 'components/LeaveStatus'
import { getSession } from 'next-auth/client'
import { useQuery } from 'react-query'
import { getProfileQuery } from 'query/query'
import Dashboard from 'components/Dashboard'
import Loading from 'components/Loading'

type VoteDocument = {
  vote: string
}

export default function Home(props) {
  const [session, loading] = useSession()
  const { isLoading, data: profile } = useQuery('getUser', () =>
    getProfileQuery(session.user)
  )
  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {!profile.isLeaveSanctionAuthority && <LeaveStatus user={session.user} />}
      {profile.isLeaveSanctionAuthority && <Dashboard user={session.user} />}
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      user: session ? session.user : null,
    }, // will be passed to the page component as props
  }
}
