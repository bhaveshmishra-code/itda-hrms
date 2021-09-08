import { Button, Snackbar } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab'

const MySnackBar = ({ open, onClose, msg }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      {msg.type === 'error' ? (
        <Alert severity="error" style={{ backgroundColor: 'orange' }}>
          <AlertTitle>Error</AlertTitle>
          {msg.msg}
        </Alert>
      ) : (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {msg.msg}
        </Alert>
      )}
    </Snackbar>
  )
}

const validate = (values) => {
  const errors = {}
  if (!values.id) {
    errors['id'] = 'Required'
  }

  if (!values.placeOfPosting) {
    errors['placeOfPosting'] = 'Required'
  }

  if (!values.employeeName) {
    errors['employeeName'] = 'Required'
  }

  if (!values.designation) {
    errors['designation'] = 'Required'
  }

  if (!values.email) {
    errors['email'] = 'Required'
  }

  if (!values.phone) {
    errors['phone'] = 'Required'
  }

  return errors
}

const Error = ({ error }) => <div className="text-red-600">{error}</div>

export default function EmployeeForm() {
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState({ type: '', msg: '' })
  const formik = useFormik({
    initialValues: {
      id: '',
      employeeName: '',
      designation: '',
      placeOfPosting: '',
      email: '',
      phone: '',
    },
    validate,
    onSubmit: (values) => {
      submitFormData(values)
    },
  })

  async function submitFormData(values) {
    const response = await axios.post('/api/hrms', values)
    const result = response.data
    console.log(result)
    if (result.success) {
      setSnackBarMessage({
        type: 'success',
        msg: 'Employee Created Successfully',
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

  function onSnackBarClose() {
    setSnackBarOpen(false)
  }

  return (
    <>
      <div className="bg-gray-100 w-80 mx-auto p-10 rounded-sm border-gray-400 border-1">
        <div className="font-semibold py-2 text-center">
          CREATE NEW EMPLOYEE
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="text-gray-700">Employee ID</label>
            <TextField
              id="id"
              name="id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
              variant="outlined"
              fullWidth
              size="small"
            />
            {formik.touched.id && formik.errors.id ? (
              <Error error={formik.errors.id} />
            ) : null}
          </div>
          <div className="py-1">
            <label className="text-gray-700">Name</label>
            <TextField
              id="employeeName"
              name="employeeName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employeeName}
              variant="outlined"
              fullWidth
              size="small"
            />
            {formik.touched.employeeName && formik.errors.employeeName ? (
              <Error error={formik.errors.employeeName} />
            ) : null}
          </div>
          <div className="py-1">
            <label className="text-gray-700">Designation</label>
            <TextField
              id="designation"
              name="designation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.designation}
              variant="outlined"
              fullWidth
              size="small"
            />
            {formik.touched.designation && formik.errors.designation ? (
              <Error error={formik.errors.designation} />
            ) : null}
          </div>
          <div className="py-1">
            <label className="text-gray-700">Place of Posting</label>
            <TextField
              id="placeOfPosting"
              name="placeOfPosting"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.placeOfPosting}
              variant="outlined"
              fullWidth
              size="small"
            />
            {formik.touched.placeOfPosting && formik.errors.placeOfPosting ? (
              <Error error={formik.errors.placeOfPosting} />
            ) : null}
          </div>
          <div className="py-1">
            <label className="text-gray-700">Email</label>
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
            {formik.touched.email && formik.errors.email ? (
              <Error error={formik.errors.email} />
            ) : null}
          </div>
          <div className="py-1">
            <label className="text-gray-700">Phone Number</label>
            <TextField
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              variant="outlined"
              fullWidth
              size="small"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <Error error={formik.errors.phone} />
            ) : null}
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '8px 0' }}
            type="submit"
          >
            SUBMIT
          </Button>
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
