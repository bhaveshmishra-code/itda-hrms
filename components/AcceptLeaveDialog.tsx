import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from 'axios'
import { ApiAction } from 'constants/constant'

export default function AcceptLeaveDialog({ open, onClose, leave }) {
  const handleClose = () => {
    onClose()
  }

  const acceptLeave = async () => {
    const result = await axios.post('/api/hrms', {
      action: ApiAction.ACCEPT_LEAVE,
      payload: leave,
    })
    onClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Approve Leave?'}</DialogTitle>
        <DialogContent style={{ minWidth: '200px' }}>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" size="small">
            CANCEL
          </Button>
          <Button
            onClick={acceptLeave}
            variant="contained"
            color="primary"
            size="small"
            autoFocus
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
