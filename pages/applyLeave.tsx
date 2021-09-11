import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import MomentUtils from '@date-io/moment'
import { useSession } from 'next-auth/client'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import SignIn from '../components/SignIn'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import ErrorDialog from '../components/ErrorDialog'
import ConfirmDialog from '../components/ConfirmDialog'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { ApiAction } from '../constants/constant'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    margin: '0px 8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  user: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  label: {
    padding: '8px 0',
  },
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function ApplyLeave() {
  const classes = useStyles()
  const [session, loading] = useSession()
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString())
  const [numDays, setNumDays] = useState('')
  const [reason, setReason] = useState('')
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  if (loading) {
    return <div>...</div>
  }

  if (!session) {
    return <SignIn />
  }

  const handleDateChange = (date) => {
    setSelectedDate(date.toDate().toDateString())
  }

  const setLeaveDuration = (e) => {
    setNumDays(e.target.value)
  }

  const setLeaveReason = (e) => {
    setReason(e.target.value)
  }

  const handleSubmit = () => {
    if (parseInt(numDays) < 1 || numDays.length === 0) {
      setErrorMessage('The number of days should be more than 0')
      setErrorDialogOpen(true)
    } else if (reason.length === 0) {
      setErrorMessage('The reason input cannot be empty')
      setErrorDialogOpen(true)
    } else {
      setConfirmDialogOpen(true)
    }
  }

  const onErrorDialogClose = () => {
    setErrorDialogOpen(false)
  }

  const onConfirmDialogClose = () => {
    setConfirmDialogOpen(false)
    submitLeaveApplication()
  }

  const onSnackClose = () => {
    setSnackOpen(false)
  }

  const submitLeaveApplication = async () => {
    const response = await axios.post('/api/hrms', {
      action: ApiAction.APPLY_LEAVE,
      payload: {
        email: session.user.email,
        numDays: numDays,
        startingDate: selectedDate,
        reason: reason,
      },
    })
    setSnackOpen(true)
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      spacing={3}
      className={classes.root}
    >
      <Grid item className={classes.header}>
        <Typography variant="h3">Leave Application</Typography>
      </Grid>
      <Grid item className={classes.user}>
        <Typography variant="h5">{session.user?.name}</Typography>
      </Grid>

      <Grid item container direction="column">
        <Grid item>
          <InputLabel className={classes.label}>Number of days</InputLabel>
        </Grid>

        <Grid item>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="number"
            onChange={setLeaveDuration}
          />
        </Grid>
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <InputLabel className={classes.label}>Starting Date</InputLabel>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="DD/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <Grid item container direction="column">
        <Grid item>
          <InputLabel className={classes.label}>Reason</InputLabel>
        </Grid>
        <Grid item>
          <TextField
            multiline={true}
            maxRows={2}
            variant="outlined"
            fullWidth={true}
            onChange={setLeaveReason}
          />
        </Grid>
      </Grid>

      <Grid item className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Grid>
      <ErrorDialog
        open={errorDialogOpen}
        msg={errorMessage}
        onClose={onErrorDialogClose}
      />

      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={onConfirmDialogClose}
        numDays={numDays}
        startingDate={selectedDate}
      />

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={onSnackClose}>
        <Alert severity="success">
          Leave application submitted successfully!
        </Alert>
      </Snackbar>
    </Grid>
  )
}
