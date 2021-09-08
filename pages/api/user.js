import connectDB from '../../middleware/mongo'
import User from '../../models/user'

export default async function handle(req, res) {
  await connectDB()
  const user = await User.create({
    name: 'JSK',
    email: 'jsk@gmail.com',
  })
  const kittens = await User.find()
  console.log(kittens)
  res.status(200).json({ success: true, data: user })
}
