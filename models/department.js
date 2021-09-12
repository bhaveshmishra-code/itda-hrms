import mongoose from 'mongoose'
var Schema = mongoose.Schema

var departmentSchema = new Schema({
  departmentId: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
})

mongoose.models = {}

const Department = mongoose.model('department', departmentSchema)
export default Department
