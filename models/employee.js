import mongoose from 'mongoose'
var Schema = mongoose.Schema

var employeeSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  placeOfPosting: {
    type: String,
    required: true,
  },
  reportingAuthority: {
    type: String,
    required: true,
  },
  isLeaveSanctionAuthority: {
    type: Boolean,
    default: false,
    required: true,
  },
  isCreateUserAuthority: {
    type: Boolean,
    required: true,
    default: false,
  },
})

mongoose.models = {}

const Employee = mongoose.model('employee', employeeSchema)
export default Employee
