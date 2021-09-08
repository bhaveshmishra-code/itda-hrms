import React from 'react'
import Button from '@material-ui/core/Button'
import { signIn } from 'next-auth/client'
import Grid from '@material-ui/core/Grid'

function SignIn() {
  return (
    <>
      <Grid
        container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Grid item>
          <Button
            onClick={() => signIn('google')}
            variant="contained"
            color="primary"
          >
            SIGN IN WITH GOOGLE
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SignIn
