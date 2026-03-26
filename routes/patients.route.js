import { Router } from 'express'

import * as patientsController from '../controllers/patients.controller.js'

const router = Router()

router
  .route('/')
  .get(patientsController.getAllPatients)
  .post(patientsController.createPatient)

router
  .route('/:patientsId')
  .get(patientsController.getPatientById)
  .patch(patientsController.updatePatient)
  .delete(patientsController.deletePatient)

export default router
