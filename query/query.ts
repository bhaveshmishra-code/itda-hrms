import axios from 'axios'
import { ApiAction } from 'constants/constant'
import { IAuthUser } from 'ts'

export const getProfileQuery = async (user: IAuthUser) => {
  const result = await axios.post('/api/hrms', {
    action: ApiAction.GET_USER,
    payload: user,
  })
  return result.data
}

export const getAcceptedLeavesQuery = async () => {
  const result = await axios.post('/api/hrms', {
    action: ApiAction.GET_ACCEPTED_LEAVES,
  })
  return result.data
}
