import React, { useState } from 'react'
import firebase from '../firebase/clientApp'
import { getSession } from 'next-auth/client'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'
import AcceptLeaveDialog from '../components/AcceptLeaveDialog'

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
})

export default function LeaveStatus(props) {
  const [acceptLeaveOpen, setAcceptLeaveStatus] = useState(false)
  const [leave, setLeave] = useState({})
  const classes = useStyles()

  const acceptLeave = (leave) => {
    setAcceptLeaveStatus(true)
    setLeave(leave)
    console.log(leave)
  }

  const rejectLeave = (leave) => {
    console.log(leave)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">No of days</TableCell>
              <TableCell align="right">Starting Date</TableCell>
              <TableCell align="right">Accept</TableCell>
              <TableCell align="right">Reject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.user}
                </TableCell>
                <TableCell align="right">{row.numDays}</TableCell>
                <TableCell align="right">{row.startingDate}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    startIcon={<CheckIcon />}
                    style={{ backgroundColor: '#90caf9' }}
                    onClick={() => acceptLeave(row)}
                  >
                    ACCEPT
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    startIcon={<ClearIcon />}
                    style={{ backgroundColor: '#ef5350', color: 'white' }}
                    onClick={() => rejectLeave(row)}
                  >
                    REJECT
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AcceptLeaveDialog
        open={acceptLeaveOpen}
        onClose={onAcceptLeaveDialogClose}
        leave={leave}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const db = firebase.firestore()
  const session = await getSession(context)
  const data = []

  if (session) {
    console.log(session.user)
    const snapshot = await db
      .collection('leave')
      .where('user', '==', session.user.email)
      .get()
    snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }))
  }
  return {
    props: {
      data,
    },
  }
}
