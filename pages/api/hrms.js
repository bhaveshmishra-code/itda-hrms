import { ApiAction } from '../../constants/constant'
import { createEmployee, applyLeave, getLeaveStatus } from 'server/api'

export default async function handle(req, res) {
  var { action, payload } = req.body
  switch (action) {
    case ApiAction.CREATE_EMPLOYEE:
      var { status, success, errorMsg, data } = await createEmployee(payload)
      res.status(status).json({ success, errorMsg, data })
      break
    case ApiAction.APPLY_LEAVE:
      var { status, success, errorMsg, data } = await applyLeave(payload)
      res.status(status).json({ success, errorMsg, data })
    case ApiAction.GET_LEAVE_STATUS:
      var result = await getLeaveStatus(payload)
      console.log(result)
      res.status(200).json(result)
      break
  }
}
