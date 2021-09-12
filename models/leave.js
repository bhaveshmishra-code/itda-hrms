import mongoose from 'mongoose'
import { LeaveStatusType } from '../constants/constant'
var Schema = mongoose.Schema

var leaveSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  numDays: {
    type: Number,
    required: true,
  },
  startingDate: {
    type: String,
    required: true,
  },
  leaveDates: {
    type: [String],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: LeaveStatusType.PENDING,
  },
  reportingAuthority: {
    type: String,
    default: 'poitda.utn@gmail.com',
  },
  designation: {
    type: String,
  },
  department: {
    type: String,
  },
  placeOfPosting: {
    type: String,
  },
  appliedDate: {
    type: Date,
    default: new Date(),
  },
})

mongoose.models = {}

const Leave = mongoose.model('leave', leaveSchema)
export default Leave
