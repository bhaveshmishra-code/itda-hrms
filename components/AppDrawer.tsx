import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Divider, IconButton } from '@material-ui/core'
import { signOut } from 'next-auth/client'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Home from '@material-ui/icons/Home'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import SendIcon from '@material-ui/icons/Send'
import AssignmentIcon from '@material-ui/icons/Assignment'
import QueueIcon from '@material-ui/icons/Queue'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { getProfileQuery } from 'query/query'
import axios from 'axios'
import { ApiAction } from 'constants/constant'

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: '#F1F3F4',
    boxShadow: 'rgba(255,0,0,0.2) 0px 5px 40px 0px',
    overflow: 'auto',
    position: 'fixed',
    transitionDuration: '0.25s',
    transitionProperty: 'opacity, visibility, transform',
    width: 'clamp(250px, 20vw, 20vw)',
    transitionTimingFunction: 'ease-in-out',
    left: '0',
    top: '0',
    bottom: '0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    zIndex: 10,
  },
  sidebarHeader: {
    display: 'grid',
    placeContent: 'center',
    padding: '16px 0',
    fontSize: '1.25rem',
    fontWeight: 'bolder',
  },
  sidebarItem: {
    boxSizing: 'border-box',
    color: 'rgb(96, 103, 112)',
    display: 'flex',
    width: '100%',
    padding: '8px 8px',
    gap: '8px',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      background: '#e0e0e0',
      borderRadius: '4px',
    },
  },
})

export default function AppDrawer({ user, onClose }) {
  const styles = useStyles()

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery('getUser', () => getProfileQuery(user))

  const handleClickAway = () => {
    onClose()
  }
  const logOut = () => {
    axios.post('/api/hrms', {
      action: ApiAction.LOGOUT,
      payload: {
        email: user.email,
      },
    })
    signOut({
      callbackUrl: `${window.location.origin}`,
    })
  }

  if (isLoading) {
    return <></>
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>{user.name}</div>

        <Divider />

        <Link href="/">
          <a className={styles.sidebarItem}>
            <Home />
            <span>Home</span>
          </a>
        </Link>

        {profile.isLeaveSanctionAuthority && (
          <Link href="/acceptRejectLeave">
            <a className={styles.sidebarItem}>
              <CheckBoxIcon />
              <span>Sanction Leave</span>
            </a>
          </Link>
        )}

        <Link href="/applyLeave">
          <a className={styles.sidebarItem}>
            <SendIcon />
            <span>Apply Leave</span>
          </a>
        </Link>

        {profile.isLeaveSanctionAuthority && (
          <Link href="/leaveStatus">
            <a className={styles.sidebarItem}>
              <AssignmentIcon />
              <span>Leave Status</span>
            </a>
          </Link>
        )}

        {profile.isCreateUserAuthority && (
          <Link href="/createEmployee">
            <a className={styles.sidebarItem}>
              <QueueIcon />
              <span>Create Employee</span>
            </a>
          </Link>
        )}

        <Link href="/profile">
          <a className={styles.sidebarItem}>
            <AccountBoxIcon />
            <span>Profile</span>
          </a>
        </Link>

        <a onClick={logOut} className={styles.sidebarItem}>
          <ExitToAppIcon />
          <span>Log Out</span>
        </a>
      </div>
    </ClickAwayListener>
  )
}
