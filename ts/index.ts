export interface IAuthUser {
  email?: string
  name?: string
  image?: string
}

export interface ILeaveData {
  _id: string
  employeeName: string
  numDays: number
  department: string
  designation: string
  placeOfPosting: string
  startingDate: string
  reason: string
  appliedDate: string
  email: string
}
