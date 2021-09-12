import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'
import { useQuery } from 'react-query'
import axios from 'axios'
import { ApiAction } from 'constants/constant'
import { useSession } from 'next-auth/client'
import AcceptLeaveDialog from 'components/AcceptLeaveDialog'
import RejectLeaveDialog from 'components/RejectLeaveDialog'
import styled from 'styled-components'
import { ILeaveData } from 'ts'
import { CentrePage } from 'styled'

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
})

const AcceptRejectCard = styled.div`
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
const ActionRow = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  padding-block: 8px;
  padding-inline: 4px;
`

export default function AcceptRejectLeave() {
  const [session, loading] = useSession()
  const [leave, setLeave] = useState({
    email: '',
    numDays: '',
    startingDate: '',
  })
  const classes = useStyles()
  const [isAcceptDialogOpen, setAcceptDialogOpen] = useState(false)
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false)
  const { isLoading, error, data, refetch } = useQuery(
    'leaveAction',
    async () => {
      const result = await axios.post('/api/hrms', {
        action: ApiAction.ACCEPT_REJECT_LEAVE,
        payload: session.user,
      })
      return result.data
    }
  )

  if (isLoading) return <div>Loading</div>

  const acceptLeave = (leave) => {
    setLeave(leave)
    setAcceptDialogOpen(true)
    refetch()
  }

  const onAcceptLeaveDialogClose = async () => {
    await refetch()
    setAcceptDialogOpen(false)
  }

  const rejectLeave = (leave) => {
    setLeave(leave)
    setRejectDialogOpen(true)
  }

  const onRejectLeaveDialogClose = async () => {
    await refetch()
    setRejectDialogOpen(false)
  }

  return (
    <>
      {data.length === 0 ? (
        <CentrePage>No Pending Requests</CentrePage>
      ) : (
        data.map((row: ILeaveData) => (
          <AcceptRejectCard key={row._id}>
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
            <CardRow>
              <ItemLabel>Reason</ItemLabel>
              <ItemValue>{row.reason}</ItemValue>
            </CardRow>
            <ActionRow>
              <Button
                variant="contained"
                size="small"
                startIcon={<CheckIcon />}
                style={{ backgroundColor: '#bbdefb' }}
                onClick={() => acceptLeave(row)}
              >
                ACCEPT
              </Button>

              <Button
                variant="contained"
                size="small"
                startIcon={<ClearIcon />}
                style={{ backgroundColor: '#ffcdd2' }}
                onClick={() => rejectLeave(row)}
              >
                REJECT
              </Button>
            </ActionRow>
          </AcceptRejectCard>
        ))
      )}

      <RejectLeaveDialog
        open={isRejectDialogOpen}
        onClose={onRejectLeaveDialogClose}
        leave={leave}
      />
      <AcceptLeaveDialog
        open={isAcceptDialogOpen}
        onClose={onAcceptLeaveDialogClose}
        leave={leave}
      />
    </>
  )
}
