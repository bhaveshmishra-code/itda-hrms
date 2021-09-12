import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Employee from '../../../models/employee'
import connectDB from '../../../middleware/mongo'

const options = {
  site: process.env.NEXTAUTH_URL,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(process.env.SUPER_USER)
      if (email === process.env.SUPER_USER) {
        return true
      }
      await connectDB()
      const result = await Employee.findOne({ email: email }).exec()
      return result ? true : false
      return false
    },
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options)
