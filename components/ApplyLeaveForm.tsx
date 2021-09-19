import { Button, Snackbar } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab'
import { ApiAction } from '../constants/constant'
import { makeStyles } from '@material-ui/core/styles'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import styled from 'styled-components'
import ConfirmApplyLeaveDialog from 'components/ConfirmApplyLeaveDialog'
import MySnackbar from './MySnackbar'
import * as Yup from 'yup'

const FormLabel = styled.div`
  color: gray;
  font-weight: 700;
  margin-bottom: 4px;
`

const validateSchema = Yup.object().shape({
  numDays: Yup.number()
    .positive('Input should be a positive number')
    .required('Required')
    .typeError('Input must be a number'),
  reason: Yup.string()
    .min(6, 'Reason must be 6 characters long')
    .required('Required'),
})

const useStyles = makeStyles({
  leaveForm: {
    backgroundColor: '#fafafa',
    width: '80%',
    margin: '0 auto',
  },
  error: {
    minHeight: '2rem',
  },
  formTitle: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#37474f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8px',
  },
  heading: {
    textAlign: 'center',
  },
  label: {
    color: '#455a64',
  },
  inputItem: {
    padding: '8px',
  },
  myButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const useSnackStyles = makeStyles({
  error: {
    backgroundColor: '#ff7043',
  },
  success: {
    backgroundColor: '#66bb6a',
  },
})

const MySnackBar = ({ open, onClose, msg }) => {
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

const ErrorText = styled.div`
  color: #e57373;
`

export default function ApplyLeaveForm() {
  const styles = useStyles()
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState({ type: '', msg: '' })
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      numDays: '',
      startingDate: new Date().toDateString(),
      reason: '',
    },

    validationSchema: validateSchema,
    onSubmit: (values) => {
      submitFormData(values)
    },
  })

  const onConfirmation = async () => {
    setConfirmDialogOpen(false)
    const newValues = { ...formik.values }
    const { startingDate } = formik.values

    const d = new Date(startingDate)

    var dateString =
      ('0' + d.getDate()).slice(-2) +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear()
    newValues.startingDate = dateString
    const response = await axios.post('/api/hrms', {
      action: ApiAction.APPLY_LEAVE,
      payload: newValues,
    })
    const result = response.data
    formik.resetForm()
    if (result.success) {
      setSnackBarMessage({
        type: 'success',
        msg: 'Leave Applied Successfully',
      })
      setSnackBarOpen(true)
    } else {
      setSnackBarMessage({
        type: 'error',
        msg: result.errorMsg,
      })
      setSnackBarOpen(true)
    }
  }

  async function submitFormData(values) {
    setConfirmDialogOpen(true)
  }

  function onSnackBarClose() {
    setSnackBarOpen(false)
  }

  function handleDateChange(value) {
    // console.log(value.toDate())
    formik.setFieldValue('startingDate', value.toDate())
  }

  return (
    <>
      <ConfirmApplyLeaveDialog
        open={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        values={formik.values}
        onConfirm={onConfirmation}
      />
      <MySnackbar
        open={snackBarOpen}
        onClose={onSnackBarClose}
        msg={snackBarMessage}
      />
      <div className={styles.leaveForm}>
        <div className={styles.formTitle}>APPLY LEAVE</div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormLabel>Number of Days</FormLabel>
            <TextField
              id="numDays"
              name="numDays"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.numDays}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.numDays && formik.errors.numDays ? (
                <ErrorText>{formik.errors.numDays}</ErrorText>
              ) : null}
            </div>
          </div>
          <div>
            <FormLabel>Starting Date</FormLabel>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="startingDate"
                name="startingDate"
                format="DD/MM/yyyy"
                value={formik.values.startingDate}
                onChange={handleDateChange}
                onBlur={handleDateChange}
              />
            </MuiPickersUtilsProvider>

            <div className={styles.error}>
              {formik.touched.startingDate && formik.errors.startingDate ? (
                <ErrorText>{formik.errors.startingDate} </ErrorText>
              ) : null}
            </div>
          </div>

          <div>
            <FormLabel>Reason</FormLabel>
            <TextField
              id="reason"
              name="reason"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.reason && formik.errors.reason ? (
                <ErrorText>{formik.errors.reason} </ErrorText>
              ) : null}
            </div>
          </div>

          <div className={styles.myButton}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
      <MySnackBar
        open={snackBarOpen}
        onClose={onSnackBarClose}
        msg={snackBarMessage}
      />
    </>
  )
}
