import mongoose from 'mongoose'
var Schema = mongoose.Schema

var userActivitySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  activityType: {
    type: Number,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: new Date(),
  },
})

mongoose.models = {}

const UserActivity = mongoose.model('userActivity', userActivitySchema)
export default UserActivity
