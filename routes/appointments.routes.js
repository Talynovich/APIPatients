import { Router } from 'express'

import {
  create,
  getMyAppointments,
} from '../controllers/appointment.controller.js'
import {
  authMiddleware,
  checkRoleMiddleware,
} from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', authMiddleware, checkRoleMiddleware(['Doctor']), create)
router.get(
  '/me',
  authMiddleware,
  checkRoleMiddleware(['Doctor']),
  getMyAppointments
)

export default router
