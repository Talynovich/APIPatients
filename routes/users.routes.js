import { Router } from 'express'

import { getAllUsers, setupUser } from '../controllers/users.controller.js'
import {
  authMiddleware,
  checkRoleMiddleware,
} from '../middlewares/authMiddleware.js'

const router = Router()

router.get(
  '/doctors',
  authMiddleware,
  checkRoleMiddleware(['Admin', 'Doctor']),
  getAllUsers
)
router.post(
  '/doctors',
  authMiddleware,
  checkRoleMiddleware(['Admin']),
  setupUser
)

export default router
