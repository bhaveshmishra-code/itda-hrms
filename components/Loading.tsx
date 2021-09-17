import React from 'react'
import { HashLoader } from 'react-spinners'
import styled from 'styled-components'

const Loader = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Loading() {
  return (
    <Loader>
      <HashLoader color="orange" />
    </Loader>
  )
}
