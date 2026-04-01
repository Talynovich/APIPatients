import { Router } from 'express'

import * as patientsController from '../controllers/patients.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router
  .route('/')
  .get(authMiddleware, patientsController.getAllPatients)
  .post(authMiddleware, patientsController.createPatient)

router
  .route('/:patientsId')
  .get(authMiddleware, patientsController.getPatientById)
  .patch(authMiddleware, patientsController.updatePatient)
  .delete(authMiddleware, patientsController.deletePatient)

export default router
