import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Divider, IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'
import AssessmentTwoToneIcon from '@material-ui/icons/AssessmentTwoTone'
import PlaylistAddCheckTwoToneIcon from '@material-ui/icons/PlaylistAddCheckTwoTone'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: 'white',
    boxShadow: 'rgba(255,0,0,0.2) 0px 5px 40px 0px',
    overflow: 'auto',
    position: 'fixed',
    transitionDuration: '0.25s',
    transitionProperty: 'opacity, visibility, transform',
    width: 'clamp(200px, 20vw, 20vw)',
    transitionTimingFunction: 'ease-in-out',
    left: '0',
    top: '0',
    bottom: '0',
    boxSizing: 'border-box',
    zIndex: '10',
  },
  sidebarHeader: {
    display: 'grid',
    placeContent: 'center',
    padding: '16px 0',
    fontSize: '1.25rem',
    fontWeight: 'bolder',
  },
  sidebarItem: {
    color: 'rgb(96, 103, 112)',
    display: 'flex',
    width: '100%',
    padding: '8px 8px',
    gap: '8px',
    alignItems: 'center',
    cursor: 'pointer',
  },
})

export default function AppDrawer({ user, onClose }) {
  const router = useRouter()
  const styles = useStyles()
  const handleClickAway = () => {
    onClose()
  }
  const logOut = () => {
    signOut()
  }
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>{user.name}</div>
        <Divider />
        <Link href="/">
          <a className={styles.sidebarItem}>
            <HomeTwoToneIcon />
            Home
          </a>
        </Link>
        <Link href="/">
          <a className={styles.sidebarItem}>
            <AssessmentTwoToneIcon />
            Dashboard
          </a>
        </Link>
        <Link href="/">
          <a className={styles.sidebarItem}>
            <PlaylistAddCheckTwoToneIcon />
            Sanction Leave
          </a>
        </Link>

        <a
          className={styles.sidebarItem}
          onClick={() => {
            onClose()
            router.push('/applyLeave')
          }}
        >
          <DateRangeTwoToneIcon />
          Apply Leave
        </a>

        <button onClick={logOut} className={styles.sidebarItem}>
          <ExitToAppIcon />
          <span>Log Out</span>
        </button>
      </div>
    </ClickAwayListener>
  )
}
