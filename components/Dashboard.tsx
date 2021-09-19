import React, { useEffect, useState } from 'react'
import { getAcceptedLeavesQuery } from 'query/query'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { ILeaveData } from 'ts'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: baseline;
  font-size: 1.25rem;
  font-weight: 700;
  color: #37474f;
  display: flex;
  justify-content: center;
`

const LeaveCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  margin: 8px 0;
  color: #455a64;
  padding: 4px 4px;
  font-weight: 400;

  .name {
    font-weight: 700;
    font-size: 1rem;
  }
  .designation,
  .place {
    font-weight: 500;
    font-size: 1 rem;
  }
`

const NoLeave = styled.div`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`

const getDateString = (d) => {
  var dateString =
    ('0' + d.getDate()).slice(-2) +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    d.getFullYear()
  return dateString
}

const getLeaveDescription = (numDays, startingDate) => {
  if (numDays === 1) {
    return ` day leave on `
  } else {
    return ` days leave starting from `
  }
}

export default function Dashboard() {
  const [filterDate, setFilterDate] = useState(new Date())

  const handleDateChange = (e) => {
    setFilterDate(e.toDate())
  }

  return (
    <>
      <PageHeader>
        <div>Employees On Leave:</div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="startingDate"
            size="small"
            name="startingDate"
            format="DD/MM/yyyy"
            value={filterDate}
            onChange={handleDateChange}
            inputVariant="outlined"
          />
        </MuiPickersUtilsProvider>{' '}
      </PageHeader>
      <LeaveData filterDate={getDateString(filterDate)} />
    </>
  )
}

const LeaveData = ({ filterDate }) => {
  const { data, isLoading, refetch } = useQuery('getAcceptedLeaves', () =>
    getAcceptedLeavesQuery(filterDate)
  )

  useEffect(() => {
    refetch()
  }, [filterDate, refetch])

  if (isLoading) return <></>

  const leaves = data.map((row: ILeaveData) => (
    <LeaveCard key={row._id}>
      <div>
        <div className="name">{row.employeeName}</div>
      </div>
      <div>
        <div>{row.designation}</div>
      </div>
      <div>
        <div>{row.department}</div>
      </div>
      <div>
        <div>{row.placeOfPosting}</div>
      </div>
      <div>
        <div>
          <strong>{row.numDays}</strong>
          {getLeaveDescription(row.numDays, row.startingDate)}
          <strong>{row.startingDate}</strong>
        </div>
      </div>
    </LeaveCard>
  ))

  return (
    <>
      {data.length === 0 ? (
        <NoLeave>No Employee on leave !</NoLeave>
      ) : (
        <>{leaves}</>
      )}
    </>
  )
}
