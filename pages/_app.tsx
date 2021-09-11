import { Provider as AuthProvider } from 'next-auth/client'
import React from 'react'
import Layout from '../components/Layout'
import '../styles/global.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
