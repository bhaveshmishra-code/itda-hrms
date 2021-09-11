import connectDB from 'middleware/mongo'
import Leave from 'models/leave'
import Employee from 'models/employee'

export async function applyLeave(payload) {
  await connectDB()
  const leave = new Leave(payload)
  const resp = await leave.save()
  return {
    status: 200,
    success: true,
    data: resp,
    errorMsg: null,
  }
}

export async function createEmployee(payload) {
  await connectDB()
  const existingEmployeeWithId = await Employee.find({ id: payload.id }).exec()
  if (existingEmployeeWithId.length > 0) {
    return {
      status: 200,
      success: false,
      errorMsg: `Employee with ID: ${payload.id} already exists.`,
      data: null,
    }
  }

  const existingEmployeeWithEmail = await Employee.find({
    email: payload.email,
  }).exec()

  if (existingEmployeeWithEmail.length > 0) {
    return {
      status: 200,
      success: false,
      errorMsg: `Employee with email: ${payload.email} already exists.`,
      data: null,
    }
  }

  const employee = new Employee(payload)
  const resp = await employee.save()
  return {
    status: 200,
    success: true,
    data: resp,
    errorMsg: null,
  }
}

export async function getLeaveStatus(user) {
  await connectDB()
  const leaves = await Leave.find({ email: user.email }).exec()
  return {
    leaves,
  }
}
