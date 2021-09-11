import React, { useEffect, useState } from 'react'
import { ApiAction, LeaveStatusType } from 'constants/constant'
import axios from 'axios'
import { useQuery } from 'react-query'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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
      <TableCell component="th" scope="row">
        {item.numDays}
      </TableCell>
      <TableCell>{item.startingDate}</TableCell>
      <TableCell>
        <StatusCell status={item.status} />
      </TableCell>
    </TableRow>
  ))

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Num Days</TableCell>
            <TableCell>Starting Date</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{leaveItems}</TableBody>
      </Table>
    </TableContainer>
  )
}

function StatusCell({ status }) {
  const [leaveStatus, statusColor] = getStatusString(status)

  return (
    <div
      style={{
        backgroundColor: `${statusColor}`,
        textAlign: 'center',
        padding: '0.75vw 0',
        borderRadius: '1vw',
        maxWidth: '8rem',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      {leaveStatus}
    </div>
  )
}

const getStatusString = (status) => {
  switch (status) {
    case LeaveStatusType.ACCEPTED:
      return ['ACCEPTED', '#4fc3f7']
      break
    case LeaveStatusType.PENDING:
      return ['PENDING', '#b0bec5']
      break
    case LeaveStatusType.REJECTED:
      return ['REJECTED', '#ff7043']
      break
  }
}
