import Employee from 'models/employee'
import connectDB from 'middleware/mongo'
import axios from 'axios'

const webAppUrl =
  'https://script.google.com/macros/s/AKfycbzyRXrqwjesNQDeAsD2jxCal5ozub10O5ceRg0A-faSkpg4T4jvk0PUQRYGnUzQ_6N7/exec'

export default async function handle(req, res) {
  const body = 'Your leave application has been rejected'
  const recipient = 'bhaveshmishra01@gmail.com'
  const subject = 'Leave Application Accepted'
  const gScriptUrl =
    webAppUrl + `?recipient=${recipient}&subject=${subject}&body=${body}`
  const result = await axios.get(gScriptUrl)
  console.log(result)
  res.status(200).send(result.data)
}
