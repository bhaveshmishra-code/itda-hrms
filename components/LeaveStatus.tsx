import React, { useEffect, useState } from 'react'
import { ApiAction, LeaveStatusType } from 'constants/constant'
import axios from 'axios'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const LeaveTable = styled.div`
  margin-top: 8px;
  font-size: 1rem;
  color: #455a64;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 8px;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid #cfd8dc;
  padding-bottom: 4px;
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 8px;
  border-bottom: 1px solid #cfd8dc;
`

const TableCell = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-bottom: 4px;
`
const PageHeader = styled.div`
  font-weight: 700;
  color: #455a64;
  margin-inline: 1rem;
  text-align: center;
  font-size: 1.25rem;
`

export default function LeaveStatus({ user }) {
  const { isLoading, error, data } = useQuery('leaveData', async () => {
    const result = await axios.post('/api/hrms', {
      action: ApiAction.GET_LEAVE_STATUS,
      payload: user,
    })
    return result.data.leaves
  })

  if (isLoading) return <div>Loading</div>

  const leaveItems = data.map((item) => (
    <TableRow key={item._id}>
      <TableCell>{item.numDays}</TableCell>
      <TableCell>{item.startingDate}</TableCell>
      <TableCell>
        <StatusCell status={item.status} />
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <PageHeader>Leave Status</PageHeader>
      <LeaveTable>
        <TableHeader>
          <div>Num Days</div>
          <div>Starting Date</div>
          <div>Status</div>
        </TableHeader>
        {leaveItems}
      </LeaveTable>
    </>
  )
}

function StatusCell({ status }) {
  const [leaveStatus, statusColor] = getStatusString(status)

  return (
    <div
      style={{
        backgroundColor: `${statusColor}`,
        textAlign: 'center',
        width: '80%',
        padding: '0.25rem 0',
        borderRadius: '4px',
        fontWeight: 500,
      }}
    >
      {leaveStatus}
    </div>
  )
}

const getStatusString = (status) => {
  switch (status) {
    case LeaveStatusType.ACCEPTED:
      return ['ACCEPTED', '#90caf9']
      break
    case LeaveStatusType.PENDING:
      return ['PENDING', '#e0e0e0']
      break
    case LeaveStatusType.REJECTED:
      return ['REJECTED', '#ef9a9a']
      break
  }
}
