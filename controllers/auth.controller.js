import jwt from 'jsonwebtoken'

import * as authService from '../services/auth.service.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authService.register(email, password)
    res.status(201).json({ id: user.id, email: user.email })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authService.login(email, password)
    res.json(user)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body
    const tokens = await authService.refresh(refreshToken)
    res.json(tokens)
  } catch (error) {
    res.status(400).send('Refresh token error')
  }
}
