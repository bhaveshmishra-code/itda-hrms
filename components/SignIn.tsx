import React from 'react'
import Button from '@material-ui/core/Button'
import { signIn } from 'next-auth/client'
import styled from 'styled-components'

const SignPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  gap: 2vh;
`

const Heading = styled.div`
  font-weight: 800;
  color: #37474f;
  font-size: clamp(1rem, 1.75rem, 3vw);
`

function SignIn() {
  return (
    <SignPage>
      <Heading>ITDA</Heading>
      <Heading>Human Resource Management System</Heading>
      <Button
        onClick={() => signIn('google')}
        variant="contained"
        color="primary"
        size="large"
      >
        SIGN IN WITH GOOGLE
      </Button>
    </SignPage>
  )
}

export default SignIn
