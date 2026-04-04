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

export const checkRoleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Пользователь не авторизован' })
      }

      const userRole = req.user.role

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          message: `Доступ запрещен. Требуемая роль: ${roles.join(' или ')}`,
        })
      }

      next()
    } catch (e) {
      res.status(500).json({ message: 'Ошибка проверки прав доступа' })
    }
  }
}
