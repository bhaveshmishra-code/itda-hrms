import React from 'react'
import { getAcceptedLeavesQuery } from 'query/query'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { ILeaveData } from 'ts'

const PageHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #37474f;
  display: flex;
  justify-content: center;
`

const LeaveCard = styled.div`
  border-radius: 4px;
  border: 1px solid #fafafa;
  background-color: #f5f5f5;
  margin: 8px 0;
  color: #455a64;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0px 2px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`
const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const ItemLabel = styled.span`
  padding-inline: 4px;
  font-weight: 400;
`
const ItemValue = styled.span`
  font-weight: 500;
  padding-inline: 4px;
`

export default function Dashboard() {
  const { data, isLoading } = useQuery(
    'getAcceptedLeaves',
    getAcceptedLeavesQuery
  )
  if (isLoading) return <></>

  const leaves = data.map((row: ILeaveData) => (
    <LeaveCard key={row._id}>
      <CardRow>
        <ItemLabel>Name</ItemLabel>
        <ItemValue>{row.employeeName}</ItemValue>
      </CardRow>
      <CardRow>
        <ItemLabel>Designation</ItemLabel>
        <ItemValue>{row.designation}</ItemValue>
      </CardRow>
      <CardRow>
        <ItemLabel>Department</ItemLabel>
        <ItemValue>{row.department}</ItemValue>
      </CardRow>
      <CardRow>
        <ItemLabel>Place of Posting</ItemLabel>
        <ItemValue>{row.placeOfPosting}</ItemValue>
      </CardRow>
      <CardRow>
        <ItemLabel>Days</ItemLabel>
        <ItemValue>{row.numDays}</ItemValue>
      </CardRow>
      <CardRow>
        <ItemLabel>Starting Date</ItemLabel>
        <ItemValue>{row.startingDate}</ItemValue>
      </CardRow>
      <CardRow></CardRow>
    </LeaveCard>
  ))
  return (
    <>
      <PageHeader>Employees On Leave</PageHeader>
      {leaves}
    </>
  )
}
