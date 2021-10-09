import React from 'react'
import CreateEmployeeForm from '../components/CreateEmployeeForm'
import { getDepartmentListQuery, QueryKey } from 'query/query'
import { useQuery } from 'react-query'
import Loading from 'components/Loading'

export default function CreateEmployee() {
  const { data, isLoading, refetch } = useQuery(
    QueryKey.GET_DEPARTMENT_QUERY,
    () => getDepartmentListQuery()
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <CreateEmployeeForm departments={data} />
    </div>
  )
}
