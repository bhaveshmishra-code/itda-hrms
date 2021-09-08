import connectDB from '../../middleware/mongo'
import Employee from '../../models/employee'

export default async function handle(req, res) {
  await connectDB()

  const existingEmployeeWithId = await Employee.find({ id: req.body.id }).exec()
  if (existingEmployeeWithId.length > 0) {
    res.status(200).json({
      success: false,
      errorMsg: `Employee with ID: ${req.body.id} already exists.`,
    })
    return
  }

  const existingEmployeeWithEmail = await Employee.find({
    email: req.body.email,
  }).exec()

  if (existingEmployeeWithEmail.length > 0) {
    res.status(200).json({
      success: false,
      errorMsg: `Employee with email: ${req.body.email} already exists.`,
    })
    return
  }

  const employee = new Employee(req.body)
  const resp = await employee.save()
  res.status(200).json({ success: true, data: resp })
}
