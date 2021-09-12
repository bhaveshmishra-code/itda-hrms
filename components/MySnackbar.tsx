import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import React from 'react'

const useSnackStyles = makeStyles({
  error: {
    backgroundColor: '#ff7043',
  },
  success: {
    backgroundColor: '#66bb6a',
  },
})

export default function MySnackbar({ open, onClose, msg }) {
  const styles = useSnackStyles()
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {msg.type === 'error' ? (
        <Alert className={styles.error} variant="filled">
          <AlertTitle>Error</AlertTitle>
          {msg.msg}
        </Alert>
      ) : (
        <Alert className={styles.success} variant="filled">
          <AlertTitle>Success</AlertTitle>
          {msg.msg}
        </Alert>
      )}
    </Snackbar>
  )
}
