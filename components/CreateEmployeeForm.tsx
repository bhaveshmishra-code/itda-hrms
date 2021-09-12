import { Button, Snackbar } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { ApiAction } from '../constants/constant'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import MySnackbar from './MySnackbar'
import Switch from '@material-ui/core/Switch'
import * as Yup from 'yup'

const validateSchema = Yup.object().shape({
  employeeId: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  reportingAuthority: Yup.string().required('Required'),
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

const SwitchItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: gray;
  font-weight: 700;
`

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
`

const useStyles = makeStyles({
  form: {
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

const ErrorText = styled.div`
  color: #e57373;
`

export default function CreateEmployeeForm() {
  const styles = useStyles()
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState({ type: '', msg: '' })
  const formik = useFormik({
    initialValues: {
      employeeId: '',
      employeeName: '',
      department: '',
      designation: '',
      placeOfPosting: '',
      reportingAuthority: '',
      email: '',
      phone: '',
      isLeaveSanctionAuthority: false,
      isCreateUserAuthority: false,
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      submitFormData(values)
    },
  })

  async function submitFormData(values) {
    const response = await axios.post('/api/hrms', {
      action: ApiAction.CREATE_EMPLOYEE,
      payload: values,
    })
    const result = response.data

    if (result.success) {
      setSnackBarMessage({
        type: 'success',
        msg: 'Employee Created Successfully',
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
      <div className={styles.form}>
        <div className={styles.formTitle}>CREATE NEW EMPLOYEE</div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <FormLabel>Employee ID</FormLabel>
            <TextField
              id="employeeId"
              name="employeeId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employeeId}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.employeeId && formik.errors.employeeId ? (
                <ErrorText>{formik.errors.employeeId} </ErrorText>
              ) : null}
            </div>
          </div>
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
            <FormLabel>Department</FormLabel>
            <TextField
              id="department"
              name="department"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.department && formik.errors.department ? (
                <ErrorText>{formik.errors.department} </ErrorText>
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

          <div>
            <FormLabel>Reporting Authority (email)</FormLabel>
            <TextField
              id="reportingAuthority"
              name="reportingAuthority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reportingAuthority}
              variant="outlined"
              fullWidth
              size="small"
            />
            <div className={styles.error}>
              {formik.touched.reportingAuthority &&
              formik.errors.reportingAuthority ? (
                <ErrorText>{formik.errors.reportingAuthority} </ErrorText>
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
          <SwitchItem>
            LEAVE SANCTION RIGHT
            <Switch
              id="isLeaveSanctionAuthority"
              name="isLeaveSanctionAuthority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // value={formik.values.isLeaveSanctionAuthority}
              checked={formik.values.isLeaveSanctionAuthority}
              color="primary"
            />
          </SwitchItem>
          <SwitchItem>
            CREATE USER RIGHT
            <Switch
              id="isCreateUserAuthority"
              name="isCreateUserAuthority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // value={formik.values.isLeaveSanctionAuthority}
              checked={formik.values.isCreateUserAuthority}
              color="primary"
            />
          </SwitchItem>
          <SubmitButton>
            <Button variant="contained" color="primary" type="submit">
              SUBMIT
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
