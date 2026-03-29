import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/userModel.js'

export const register = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error('User already exists')
  }
  return User.create({ email, password })
}

export const login = async (email, password) => {
  const user = await User.findOne({ email })
  const isPasswordValid = await bcrypt.compare(password, user?.password)
  if (!user || !isPasswordValid) {
    throw new Error('User already exists')
  }
  const accessToken = jwt.sign({ id: user._id }, 'SECRET', { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id: user._id }, 'SECRET', { expiresIn: '3d' })

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
