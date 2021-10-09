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

export const getAcceptedLeavesQuery = async (filterDate, user) => {
  // console.log('Get accepted leave query', filterDate, user)
  const result = await axios.post('/api/hrms', {
    action: ApiAction.GET_ACCEPTED_LEAVES,
    payload: {
      filterDate: filterDate,
      reportingAuthority: user.email,
    },
  })
  return result.data
}

export const getDepartmentListQuery = async () => {
  const result = await axios.post('/api/hrms', {
    action: ApiAction.GET_DEPARTMENT,
    payload: {},
  })
  return result.data
}

export const QueryKey = {
  PROFILE_QUERY: 'profile_query',
  GET_DEPARTMENT_QUERY: 'get_department_query',
}
