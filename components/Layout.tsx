import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useEffect, useState } from 'react'
import AppDrawer from 'components/AppDrawer'
import { useSession } from 'next-auth/client'
import SignIn from '../components/SignIn'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from './Loading'

export default function Layout({ children }) {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [session, loading] = useSession()

  useEffect(() => {
    setOpenDrawer(false)
  }, [router])

  if (loading) {
    return <></>
  }

  if (!session) {
    return <SignIn />
  }

  return (
    <>
      <AppBar
        elevation={0}
        position="static"
        style={{ backgroundColor: 'transparent', color: 'black' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <AppHeader>ITDA - HRMS</AppHeader>
        </Toolbar>
      </AppBar>
      {openDrawer && (
        <AppDrawer user={session.user} onClose={() => setOpenDrawer(false)} />
      )}

      <div>{children}</div>
    </>
  )
}

const AppHeader = styled.div`
  color: #455a64;
  font-weight: 700;
  font-size: 1.5rem;
`
