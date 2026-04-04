import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { ROLES } from '../constants/common.js'
import { User } from '../models/userModel.js'
import { userRole } from '../models/userRoleModel.js'

export const register = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error('User already exists')
  }
  return User.create({ email, password })
}

export const login = async (email, password) => {
  let user = await User.findOne({ email })
  if (!user) {
    user = await userRole.findOne({ email })
  }
  const isPasswordValid = await bcrypt.compare(password, user?.password)
  if (!user || !isPasswordValid) {
    throw new Error('User already exists')
  }
  const accessToken = jwt.sign({ id: user._id, role: user.role }, 'SECRET', {
    expiresIn: '15m',
  })
  const refreshToken = jwt.sign({ id: user._id, role: user.role }, 'SECRET', {
    expiresIn: '3d',
  })

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email },
  }
}

export const refresh = async (token) => {
  try {
    const payload = await jwt.verify(token, 'SECRET')
    const accessToken = jwt.sign({ id: payload.id }, 'SECRET', {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign({ id: payload.id }, 'SECRET', {
      expiresIn: '3d',
    })
    return { accessToken, refreshToken }
  } catch {
    throw new Error('Refresh token error')
  }
}

export const setupAdminService = async (data) => {
  const userCount = await userRole.countDocuments({ role: 'Admin' })

  if (userCount > 0) {
    const error = new Error(
      'Система уже инициализирована. Использование этого роута запрещено.'
    )
    error.status = 400
    throw error
  }

  const { email, password, fullName } = data
  const admin = await userRole.create({
    fullName,
    email,
    password,
    role: ROLES.ADMIN,
  })

  return admin
}
