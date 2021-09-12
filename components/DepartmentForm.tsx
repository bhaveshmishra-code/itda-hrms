import { Button, Snackbar } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab'
import { ApiAction } from '../constants/constant'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

const FormLabel = styled.div`
  color: gray;
  font-weight: 700;
  margin-bottom: 4px;
`

const useStyles = makeStyles({
  departmentForm: {
    // bg-gray-100 w-80 mx-auto p-10 rounded-sm border-gray-400 border-1
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

const validate = (values) => {
  const errors = {}
  if (!values.departmentId) {
    errors['departmentId'] = 'Required'
  }

  if (!values.departmentName) {
    errors['departmentName'] = 'Required'
  }

  if (!values.email) {
    errors['email'] = 'Required'
  }

  return errors
}

const ErrorText = styled.div`
  color: red;
`

export default function DepartmentForm() {
  const styles = useStyles()
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState({ type: '', msg: '' })
  const formik = useFormik({
    initialValues: {
      departmentId: '',
      departmentName: '',
      email: '',
    },
    validate,
    onSubmit: (values) => {
      submitFormData(values)
    },
  })

  async function submitFormData(values) {
    const response = await axios.post('/api/hrms', {
      action: ApiAction.CREATE_DEPARTMENT,
      payload: values,
    })
    const result = response.data

    if (result.success) {
      setSnackBarMessage({
        type: 'success',
        msg: 'Department Created Successfully',
      })
      setSnackBarOpen(true)
      formik.resetForm()
    } else {
      setSnackBarMessage({
        type: 'error',
        msg: result.errorMsg,
      })
      setSnackBarOpen(true)
    }
  }

  function onSnackBarClose() {
    setSnackBarOpen(false)
  }

  return (
    <>
      <div className={styles.departmentForm}>
        <div className={styles.formTitle}>CREATE NEW DEPARTMENT</div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormLabel>Department ID</FormLabel>
            <TextField
              id="departmentId"
              name="departmentId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.departmentId}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.departmentId && formik.errors.departmentId ? (
                <ErrorText>{formik.errors.departmentId}</ErrorText>
              ) : null}
            </div>
          </div>
          <div>
            <FormLabel>Department Name</FormLabel>
            <TextField
              id="departmentName"
              name="departmentName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.departmentName}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.departmentName && formik.errors.departmentName ? (
                <ErrorText>{formik.errors.departmentName} </ErrorText>
              ) : null}
            </div>
          </div>

          <div>
            <FormLabel>Email</FormLabel>
            <TextField
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.email && formik.errors.email ? (
                <ErrorText>{formik.errors.email} </ErrorText>
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
