import { connectToDatabase } from '../../middleware/mongo'
import connectDB from '../../middleware/mongo'

const handler = async (req, res) => {
  const { db } = await connectToDatabase()
  await connectDB()
  res.status(200).json({ success: true })
}
