import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'credential',
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(req.body)
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options)
