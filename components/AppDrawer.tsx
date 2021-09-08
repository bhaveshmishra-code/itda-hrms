import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { signOut } from 'next-auth/client'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  root: {
    width: '20%',
    backgroundColor: '#F7F7F7',
  },
  grid: {
    minWidth: '100%',
  },
})

export default function AppDrawer({ user, open, onClose }) {
  const style = useStyles()
  return (
    <Drawer
      className={style.root}
      anchor="left"
      open={open}
      onClose={(e, reason) => onClose()}
    >
      <Grid container direction="column" className={style.grid}>
        <Avatar alt={user.name} src={user.image} />
        <Typography variant="h6">{user.name}</Typography>
        <IconButton edge="end" onClick={() => signOut()}>
          SIGN OUT
        </IconButton>
      </Grid>
    </Drawer>
  )
}
