import { userRole } from '../models/userRoleModel.js'

export const setupUserService = async (data) => {
  const { email, password, fullName } = data

  const doctor = await userRole.create({
    fullName,
    email,
    password,
  })

  return doctor
}

export const getAllService = async () => {
  return await userRole.find({ role: 'Doctor' })
}
