import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import { ApiAction } from 'constants/constant'

export default function RejectLeaveDialog({ open, onClose, leave }) {
  const handleClose = () => {
    onClose()
  }

  const rejectLeave = async () => {
    const result = await axios.post('/api/hrms', {
      action: ApiAction.REJECT_LEAVE,
      payload: leave,
    })
    onClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{'Reject Leave?'}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small">
            CANCEL
          </Button>
          <Button
            onClick={rejectLeave}
            color="primary"
            variant="contained"
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
