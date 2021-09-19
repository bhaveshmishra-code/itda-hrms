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
import Loading from './Loading'

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
})

// const AcceptRejectCard = styled.div`
//   border-radius: 4px;
//   border: 1px solid #fafafa;
//   background-color: #f5f5f5;
//   margin: 8px 0;
//   color: #455a64;
//   font-weight: 400;
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   box-shadow: 0px 2px 1px -2px rgba(0, 0, 0, 0.2),
//     0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
// `
// const CardRow = styled.div`
//   display: flex;
//   justify-content: space-between;
// `

// const ItemLabel = styled.span`
//   padding-inline: 4px;
//   font-weight: 400;
// `
// const div = styled.span`
//   font-weight: 500;
//   padding-inline: 4px;
// `
// const ActionRow = styled.div`
//   display: flex;
//   justify-content: end;
//   gap: 8px;
//   padding-block: 8px;
//   padding-inline: 4px;
// `

const getLeaveDescription = (numDays, startingDate) => {
  if (numDays === 1) {
    return ` day leave on `
  } else {
    return ` days leave starting from `
  }
}

const LeaveStatusTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 800;
  color: #37474f;
  margin: 4px 0;
`

const LeaveDataCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  padding: 0 0.5rem;
  color: #37474f;
  font-weight: 500;
  min-width: 300px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 5%;
  margin-bottom: 8px;

  .name {
    font-weight: 700;
    font-size: 1.25rem;
  }
  .designation,
  .place {
    font-weight: 500;
    font-size: 1 rem;
  }
  .buttonRow {
    display: flex;
    justify-content: end;
    gap: 0.5rem;
    margin-bottom: 8px;
  }
  .reason {
    font-style: italic;
  }
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

  if (isLoading) return <Loading />

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
        <div>
          <LeaveStatusTitle>
            Number of pending requests: {data.length}
          </LeaveStatusTitle>
          {data.map((row: ILeaveData) => (
            <LeaveDataCard key={row._id}>
              <div>
                <div className="name">{row.employeeName}</div>
                <div className="designation">{row.designation}</div>
                <div className="place">{row.placeOfPosting}</div>
              </div>

              <div>
                <b>{row.numDays}</b>
                {getLeaveDescription(row.numDays, row.startingDate)}
                <b>{row.startingDate}</b>
              </div>

              <div className="reason">{row.reason}</div>

              <div className="buttonRow">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ClearIcon />}
                  style={{ backgroundColor: '#d50000', color: 'white' }}
                  onClick={() => rejectLeave(row)}
                >
                  REJECT
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<CheckIcon />}
                  style={{ backgroundColor: '#4527a0', color: 'white' }}
                  onClick={() => acceptLeave(row)}
                >
                  ACCEPT
                </Button>
              </div>
            </LeaveDataCard>
          ))}
        </div>
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
