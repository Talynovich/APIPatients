import { setupUserService, getAllService } from '../services/users.service.js'

export const setupUser = async (req, res) => {
  try {
    const user = await setupUserService(req.body)
    res.status(201).json({
      message: 'Доктор успешно создан',
      user: { email: user.email, role: user.role },
    })
  } catch (e) {
    res.status(400).json({
      message: 'Доктор с таким email уже создан',
    })
  }
}

export const getAllUsers = async (req, res) => {
  const patients = await getAllService()
  res.json(patients)
}
