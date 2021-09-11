import { useSession } from 'next-auth/client'
import SignIn from '../components/SignIn'
import LeaveStatus from 'components/LeaveStatus'
import { getSession } from 'next-auth/client'

type VoteDocument = {
  vote: string
}

export default function Home(props) {
  const [session, loading] = useSession()

  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (!session) {
    return <SignIn />
  }

  return (
    <div>
      <LeaveStatus user={session.user} />
    </div>
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
