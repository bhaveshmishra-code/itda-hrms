import { Provider as AuthProvider } from 'next-auth/client'
import React from 'react'
import Layout from '../components/Layout'
import '../styles/global.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
