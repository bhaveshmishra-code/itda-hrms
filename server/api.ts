import connectDB from 'middleware/mongo'
import Leave from 'models/leave'
import Department from 'models/department'
import Employee from 'models/employee'

import { LeaveStatusType } from 'constants/constant'
import axios from 'axios'

const webAppUrl =
  'https://script.google.com/macros/s/AKfycbzyRXrqwjesNQDeAsD2jxCal5ozub10O5ceRg0A-faSkpg4T4jvk0PUQRYGnUzQ_6N7/exec'

const sendGmail = async (recipient, subject, body) => {
  const gScriptUrl =
    webAppUrl + `?recipient=${recipient}&subject=${subject}&body=${body}`
  const result = await axios.get(gScriptUrl)
}

const sendLeaveAcceptNotification = (leave) => {
  const recipient = leave.email
  const subject = 'Leave Accepted'
  let leaveDayString = ''
  if (leave.numDays === 1) {
    leaveDayString = `1 day leave on ${leave.startingDate}`
  } else {
    leaveDayString = `${leave.numDays} days leave starting from ${leave.startingDate}`
  }

  const body = `Your application for ${leaveDayString} has been ACCEPTED by ${leave.reportingAuthority}`
  sendGmail(recipient, subject, body)
}

const sendLeaveRejectNotification = (leave) => {
  const recipient = leave.email
  const subject = 'Leave Rejected'
  let leaveDayString = ''
  if (leave.numDays === 1) {
    leaveDayString = `1 day leave on ${leave.startingDate}`
  } else {
    leaveDayString = `${leave.numDays} days leave starting from ${leave.startingDate}`
  }

  const body = `Your application for ${leaveDayString} has been REJECTED by ${leave.reportingAuthority}`
  sendGmail(recipient, subject, body)
}

const sendLeaveApplyNotification = (leaveObj) => {
  const recipient = leaveObj.reportingAuthority
  const subject = 'New Leave Application'
  let leaveDayString = ''
  if (leaveObj.numDays === 1) {
    leaveDayString = `1 day leave on ${leaveObj.startingDate}`
  } else {
    leaveDayString = `${leaveObj.numDays} days leave starting from ${leaveObj.startingDate}`
  }

  const body = `${leaveObj.employeeName}, ${leaveObj.designation}, ${leaveObj.placeOfPosting} has applied for ${leaveDayString}`

  sendGmail(recipient, subject, body)
}

interface IEmployee {
  employeeId: string
  department: string
  designation: string
  placeOfPosting: string
  email: string
  reportingAuthority: string
}

interface ILeave {
  email: string
  numDays: number
  startingDate: string
  reason: string
}

const getYMD = (dateString) => {
  return dateString.split('-')
}

const getDateString = (d) => {
  var dateString =
    ('0' + d.getDate()).slice(-2) +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    d.getFullYear()
  return dateString
}

export async function applyLeave(user, payload: ILeave) {
  await connectDB()

  const employee = await Employee.findOne({ email: user.email }).exec()

  //populate leave array
  let [date, month, year] = getYMD(payload.startingDate)
  let startingDate = new Date(year, month - 1, date)
  let leaveDates = [payload.startingDate]
  for (var i = 1; i < payload.numDays; i++) {
    var nextDate = startingDate.setDate(startingDate.getDate() + 1)
    var nextDateVal = new Date(nextDate)
    leaveDates.push(getDateString(nextDateVal))
  }

  const leaveObj = {
    ...payload,
    employeeName: employee['employeeName'],
    email: employee['email'],
    reportingAuthority: employee['reportingAuthority'],
    designation: employee['designation'],
    department: employee['department'],
    placeOfPosting: employee['placeOfPosting'],
    leaveDates: leaveDates,
  }
  const leave = new Leave(leaveObj)
  const result = await leave.save()
  //send email to the reporting authority
  sendLeaveApplyNotification(leaveObj)
  return {
    success: true,
  }
}

export async function createEmployee(payload: IEmployee) {
  await connectDB()
  console.log(payload)
  const existingEmployeeWithId = await Employee.find({
    employeeId: payload.employeeId,
  }).exec()
  if (existingEmployeeWithId.length > 0) {
    return {
      success: false,
      errorMsg: `Employee with ID: ${payload.employeeId} already exists.`,
    }
  }

  const existingEmployeeWithEmail = await Employee.find({
    email: payload.email,
  }).exec()

  if (existingEmployeeWithEmail.length > 0) {
    return {
      success: false,
      errorMsg: `Employee with email: ${payload.email} already exists.`,
    }
  }

  const employee = new Employee(payload)
  const resp = await employee.save()
  return {
    success: true,
  }
}

export async function getLeaveStatus(user) {
  await connectDB()
  const leaves = await Leave.find({ email: user.email })
    .sort({ appliedDate: -1 })
    .exec()
  return {
    leaves,
  }
}

export async function acceptRejectLeave(user) {
  await connectDB()
  const leaves = await Leave.find({
    reportingAuthority: user.email,
    status: LeaveStatusType.PENDING,
  })
    .sort({ appliedDate: -1 })
    .exec()
  return leaves
}

export async function acceptLeave(leave) {
  await connectDB()
  await Leave.findOneAndUpdate(
    { _id: leave._id },
    { status: LeaveStatusType.ACCEPTED }
  )
  sendLeaveAcceptNotification(leave)
}

export async function rejectLeave(leave) {
  await connectDB()
  await Leave.findOneAndUpdate(
    { _id: leave._id },
    { status: LeaveStatusType.REJECTED }
  )
  sendLeaveRejectNotification(leave)
}

export async function createDepartment(payload) {
  await connectDB()
  const existingDepartmentWithId = await Department.find({
    departmentId: payload.departmentId,
  }).exec()
  if (existingDepartmentWithId.length > 0) {
    return {
      success: false,
      errorMsg: `Department with ID: ${payload.departmentId} already exists.`,
    }
  }

  const existingDepartmentWithEmail = await Department.find({
    email: payload.email,
  }).exec()

  if (existingDepartmentWithEmail.length > 0) {
    return {
      success: false,
      errorMsg: `Department with email: ${payload.email} already exists.`,
    }
  }

  const department = new Department(payload)
  const resp = await department.save()

  return {
    success: true,
  }
}

export async function getUser(payload) {
  await connectDB()
  const employee = await Employee.findOne({ email: payload.email }).exec()
  return employee
}

export async function getAcceptedLeaves(payload) {
  await connectDB()
  const leaves = await Leave.find({
    status: LeaveStatusType.ACCEPTED,
    leaveDates: payload,
  })
    .sort({ appliedDate: -1 })
    .exec()
  return leaves
}
