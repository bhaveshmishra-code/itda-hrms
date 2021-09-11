import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useState } from 'react'
import AppDrawer from 'components/AppDrawer'
import { useSession } from 'next-auth/client'
import SignIn from '../components/SignIn'

export default function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [session, loading] = useSession()

  if (loading) {
    return <h1>Loading ...</h1>
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
          <Typography variant="h5">
            ITDA - Human Resource Management System
          </Typography>
        </Toolbar>
      </AppBar>
      {openDrawer && (
        <AppDrawer user={session.user} onClose={() => setOpenDrawer(false)} />
      )}

      <div>{children}</div>
    </>
  )
}
