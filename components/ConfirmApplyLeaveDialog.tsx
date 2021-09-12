import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const getDateString = (date) => {
  const d = new Date(date)

  var dateString =
    ('0' + d.getDate()).slice(-2) +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    d.getFullYear()
  return dateString
}

export default function ConfirmApplyLeaveDialog({
  open,
  onClose,
  values,
  onConfirm,
}) {
  const handleClose = () => {
    onClose()
  }

  const confirmSubmission = () => {
    onConfirm()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>Number of days: {values.numDays}</h3>
            <h3>Starting Date: {getDateString(values.startingDate)}</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            CANCEL
          </Button>
          <Button
            onClick={confirmSubmission}
            color="primary"
            variant="contained"
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
