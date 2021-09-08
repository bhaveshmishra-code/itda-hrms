import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'

export default function AcceptLeaveDialog({ open, onClose, leave }) {
  const handleClose = () => {
    onClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Confirm Leave Approval'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h5">{leave.user}</Typography>
            <Typography variant="h6">{leave.numDays}</Typography>
            <Typography variant="h6">{leave.startingDate}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
