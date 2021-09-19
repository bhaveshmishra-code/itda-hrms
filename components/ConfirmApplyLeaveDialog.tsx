import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import styled from 'styled-components'

const ConfirmText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  font-weight: 500;
`

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
          <ConfirmText>
            <div>Number of days: {values.numDays}</div>
            <div>Starting Date: {getDateString(values.startingDate)}</div>
          </ConfirmText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
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
