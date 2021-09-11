import mongoose from 'mongoose'
import { LeaveStatusType } from '../constants/constant'
var Schema = mongoose.Schema

var leave = new Schema({
  email: {
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
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: LeaveStatusType.PENDING,
  },
})

mongoose.models = {}

var Leave = mongoose.model('Leave', leave)

export default Leave
