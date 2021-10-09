import { ApiAction } from '../../constants/constant'
import { getSession } from 'next-auth/client'

import {
  createEmployee,
  applyLeave,
  getLeaveStatus,
  acceptRejectLeave,
  acceptLeave,
  rejectLeave,
  createDepartment,
  getUser,
  getAcceptedLeaves,
  logOutUser,
  editProfile,
  getDepartmentList,
} from 'server/api'

export default async function handle(req, res) {
  const session = await getSession({ req })

  var { action, payload } = req.body
  switch (action) {
    case ApiAction.CREATE_EMPLOYEE:
      var employeeResult = await createEmployee(payload)
      res.status(200).json(employeeResult)
      break
    case ApiAction.APPLY_LEAVE:
      var leaveResult = await applyLeave(session.user, payload)
      res.status(200).json(leaveResult)
      break
    case ApiAction.GET_LEAVE_STATUS:
      var leaveStatusResult = await getLeaveStatus(payload)
      res.status(200).json(leaveStatusResult)
      break
    case ApiAction.ACCEPT_REJECT_LEAVE:
      var acceptRejectResult = await acceptRejectLeave(payload)
      res.status(200).json(acceptRejectResult)
      break
    case ApiAction.ACCEPT_LEAVE:
      var acceptLeaveResult = await acceptLeave(payload)
      res.status(200).json(acceptLeaveResult)
      break
    case ApiAction.REJECT_LEAVE:
      var rejectLeaveResult = await rejectLeave(payload)
      res.status(200).json(rejectLeaveResult)
      break
    case ApiAction.CREATE_DEPARTMENT:
      var createDepartmentResult = await createDepartment(payload)
      res.status(200).json(createDepartmentResult)
      break
    case ApiAction.GET_USER:
      var userResult = await getUser(payload)
      res.status(200).json(userResult)
      break
    case ApiAction.GET_ACCEPTED_LEAVES:
      var acceptedLeaveResult = await getAcceptedLeaves(payload)
      res.status(200).json(acceptedLeaveResult)
      break
    case ApiAction.LOGOUT:
      var logOutResult = await logOutUser(payload)
      res.status(200).json('Logged out')
      break
    case ApiAction.EDIT_PROFILE:
      var editProfileResult = await editProfile(session.user, payload)
      res.status(200).json(editProfileResult)
      break
    case ApiAction.GET_DEPARTMENT:
      var getDepartmentListResult = await getDepartmentList()
      res.status(200).json(getDepartmentListResult)
      break
  }
}
