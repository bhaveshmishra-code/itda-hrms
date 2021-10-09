import mongoose from 'mongoose'
var Schema = mongoose.Schema

var departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
  },
})

mongoose.models = {}

const Department = mongoose.model('department', departmentSchema)
export default Department
