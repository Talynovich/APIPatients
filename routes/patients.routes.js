import { Router } from 'express'

import * as patientsController from '../controllers/patients.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router
  .route('/')
  .get(authMiddleware, patientsController.getAllPatients)
  .post(patientsController.createPatient)

router
  .route('/:patientsId')
  .get(authMiddleware, patientsController.getPatientById)
  .patch(patientsController.updatePatient)
  .delete(patientsController.deletePatient)

export default router
