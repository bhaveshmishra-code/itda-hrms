import { Button, Snackbar } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { ApiAction } from '../constants/constant'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import MySnackbar from './MySnackbar'
import * as Yup from 'yup'

const validateSchema = Yup.object().shape({
  employeeName: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  placeOfPosting: Yup.string().required('Required'),
  phone: Yup.number()
    .positive('Must be a positive number')
    .typeError('Must be a 10 digit number'),
})

const FormLabel = styled.div`
  color: gray;
  font-weight: 700;
  margin-bottom: 4px;
`

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
`

const useStyles = makeStyles({
  form: {
    // bg-gray-100 w-80 mx-auto p-10 rounded-sm border-gray-400 border-1
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

const ErrorText = styled.div`
  color: #e57373;
`

export default function EditProfileForm({ profile }) {
  const styles = useStyles()
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState({ type: '', msg: '' })
  const formik = useFormik({
    initialValues: {
      employeeName: profile.employeeName,
      designation: profile.designation,
      placeOfPosting: profile.placeOfPosting,
      phone: profile.phone,
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      submitFormData(values)
    },
  })

  async function submitFormData(values) {
    console.log('submitting edit')
    const response = await axios.post('/api/hrms', {
      action: ApiAction.EDIT_PROFILE,
      payload: values,
    })
    const result = response.data

    if (result.success) {
      setSnackBarMessage({
        type: 'success',
        msg: 'Profile Information Updated Successfully',
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
      <div className={styles.form}>
        <div className={styles.formTitle}>EDIT PROFILE</div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormLabel>Name</FormLabel>
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
            <div className={styles.error}>
              {formik.touched.employeeName && formik.errors.employeeName ? (
                <ErrorText>{formik.errors.employeeName} </ErrorText>
              ) : null}
            </div>
          </div>
          <div>
            <FormLabel>Designation</FormLabel>
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
            <div className={styles.error}>
              {formik.touched.designation && formik.errors.designation ? (
                <ErrorText>{formik.errors.designation} </ErrorText>
              ) : null}
            </div>
          </div>
          <div>
            <FormLabel>Place of Posting</FormLabel>
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
            <div className={styles.error}>
              {formik.touched.placeOfPosting && formik.errors.placeOfPosting ? (
                <ErrorText>{formik.errors.placeOfPosting} </ErrorText>
              ) : null}
            </div>
          </div>

          <div>
            <FormLabel>Phone Number</FormLabel>
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
            <div className={styles.error}>
              {formik.touched.phone && formik.errors.phone ? (
                <ErrorText>{formik.errors.phone} </ErrorText>
              ) : null}
            </div>
          </div>

          <SubmitButton>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              SUBMIT CHANGES
            </Button>
          </SubmitButton>
        </form>
      </div>
      <MySnackbar
        open={snackBarOpen}
        onClose={onSnackBarClose}
        msg={snackBarMessage}
      />
    </>
  )
}
