import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication header required' })
  }
  try {
    req.user = jwt.verify(authHeader, 'SECRET')
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
