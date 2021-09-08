import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default function ActionCard({ href, detail }) {
  return (
    <Link href={href}>
      <a style={{ textDecoration: 'none' }}>
        <Card variant="outlined" style={{ backgroundColor: 'teal' }}>
          <CardContent>
            <Typography variant="h3">{detail}</Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  )
}
