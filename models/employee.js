import mongoose from 'mongoose'
var Schema = mongoose.Schema

var employee = new Schema({
  id: {
    type: String,
    required: true,
  },
  employeeName: {
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
})

mongoose.models = {}

var Employee = mongoose.model('Employee', employee)

export default Employee
